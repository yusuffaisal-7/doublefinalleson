import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaEdit, FaTrash, FaClock, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

const ManageServices = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    teachingMode: "Online",
    hourlyRate: "",
    availability: "",
    location: "",
    description: "",
  });
  const [editServiceId, setEditServiceId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user's services
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/services/all`)
        .then((res) => {
          const userServices = res.data.filter((s) => s.tutorEmail === user.email);
          setServices(userServices);
        })
        .catch((err) => {
          console.error("Error fetching services:", err);
          Swal.fire("Error", "Failed to load services", "error");
        });
    }
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newService = {
      tutorEmail: user.email,
      tutorName: user.displayName || "Unknown",
      subject: formData.subject,
      teachingMode: formData.teachingMode,
      hourlyRate: parseFloat(formData.hourlyRate) || 0,
      availability: formData.availability,
      location: formData.teachingMode === "Online" ? null : formData.location || "Not specified",
      description: formData.description,
      createdAt: editServiceId ? undefined : new Date().toISOString(),
    };

    try {
      if (editServiceId) {
        const res = await axiosSecure.put(`/services/${editServiceId}`, newService);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Service updated successfully",
            background: "#ffffff",
            confirmButtonColor: "#DA3A60",
          });
          setServices((prev) =>
            prev.map((s) =>
              s._id === editServiceId
                ? { ...newService, _id: editServiceId, updatedAt: new Date().toISOString() }
                : s
            )
          );
          setEditServiceId(null);
        }
      } else {
        const res = await axiosSecure.post("/services", newService);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Service added successfully",
            background: "#ffffff",
            confirmButtonColor: "#DA3A60",
          });
          setServices((prev) => [
            ...prev,
            {
              ...newService,
              _id: res.data.insertedId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ]);
        }
      }

      // Reset form
      setFormData({
        subject: "",
        teachingMode: "Online",
        hourlyRate: "",
        availability: "",
        location: "",
        description: "",
      });
    } catch (err) {
      console.error("Error saving service:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to save service",
        background: "#ffffff",
        confirmButtonColor: "#DA3A60",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      subject: service.subject,
      teachingMode: service.teachingMode,
      hourlyRate: service.hourlyRate.toString(),
      availability: service.availability,
      location: service.location || "",
      description: service.description,
    });
    setEditServiceId(service._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DA3A60",
      cancelButtonColor: "#70C5D7",
      confirmButtonText: "Yes, delete it!",
      background: "#ffffff",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/services/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your service has been deleted.",
            icon: "success",
            background: "#ffffff",
            confirmButtonColor: "#DA3A60",
          });
          setServices((prev) => prev.filter((s) => s._id !== id));
        }
      } catch (err) {
        console.error("Error deleting service:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "Failed to delete service",
          background: "#ffffff",
          confirmButtonColor: "#DA3A60",
        });
      }
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#005482] mb-2">Manage Services</h2>
        <p className="text-[#70C5D7]">Create and manage your teaching services</p>
      </div>

      {/* Service Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h3 className="text-xl font-semibold text-[#005482] mb-6">
          {editServiceId ? "Update Service" : "Add New Service"}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#005482] mb-1">Subject</label>
              <input
                name="subject"
                type="text"
                placeholder="Enter subject name"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7] focus:outline-none focus:border-[#DA3A60]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#005482] mb-1">Teaching Mode</label>
              <select
                name="teachingMode"
                value={formData.teachingMode}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7] focus:outline-none focus:border-[#DA3A60]"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#005482] mb-1">Hourly Rate (USD)</label>
              <input
                name="hourlyRate"
                type="number"
                placeholder="Enter hourly rate"
                value={formData.hourlyRate}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7] focus:outline-none focus:border-[#DA3A60]"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#005482] mb-1">Availability</label>
              <input
                name="availability"
                type="text"
                placeholder="e.g., Weekdays 9AM-5PM"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7] focus:outline-none focus:border-[#DA3A60]"
                required
              />
            </div>

            {formData.teachingMode !== "Online" && (
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">Location</label>
                <input
                  name="location"
                  type="text"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7] focus:outline-none focus:border-[#DA3A60]"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#005482] mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Describe your service"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7] focus:outline-none focus:border-[#DA3A60] min-h-[100px]"
              ></textarea>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#DA3A60] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
            >
              {isSubmitting ? "Processing..." : editServiceId ? "Update Service" : "Add Service"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6">
              {/* Service Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#70C5D7] bg-opacity-10 rounded-lg">
                  <FaChalkboardTeacher className="text-2xl text-[#70C5D7]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#005482]">{service.subject}</h3>
                  <p className="text-[#DA3A60] font-medium">${service.hourlyRate}/hr</p>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <FaGlobe className="text-[#70C5D7]" />
                  <span className="text-[#005482]">{service.teachingMode}</span>
                </div>
                {service.location && (
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#70C5D7]" />
                    <span className="text-[#005482]">{service.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <FaClock className="text-[#70C5D7]" />
                  <span className="text-[#005482]">{service.availability}</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#70C5D7] bg-opacity-5 rounded-lg p-4 mb-6">
                <p className="text-[#005482] text-sm line-clamp-3">{service.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 bg-[#70C5D7] bg-opacity-10 text-[#005482] py-2 rounded-lg hover:bg-opacity-20 transition-colors font-medium"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex-1 bg-[#DA3A60] bg-opacity-10 text-[#DA3A60] py-2 rounded-lg hover:bg-opacity-20 transition-colors font-medium"
                >
                  <FaTrash className="inline mr-2" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;
