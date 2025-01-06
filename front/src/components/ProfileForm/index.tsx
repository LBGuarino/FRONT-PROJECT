"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Alert, IconButton, TextField } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { initialValues } from "@/config/signupConfig";

export default function ProfileForm() {
  const { user, error, isLoading } = useUser();
  const [form, setForm] = useState(initialValues);
  const [alert, setAlert] = useState<{
    show: boolean;
    severity: "success" | "error" | "info" | "warning";
    message: string;
  }>({ show: false, severity: "info", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditable, setIsEditable] = useState({ address: false, phone: false });

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const response = await axios.post("http://localhost:3001/users/check-or-create", {
            email: user.email,
            password: user.sub,
          });

          if (response.status === 200) {
            const { user: userFromDb } = response.data;
            setForm((prevForm) => ({
              ...prevForm,
              address: userFromDb.address || "",
              phone: userFromDb.phone || "",
            }));

            if (userFromDb.isRegistered === false) {
              setShowRegistrationModal(true);
            }
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (field: "address" | "phone") => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const showAlert = (
    severity: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    setAlert({ show: true, severity, message });
    setTimeout(() => {
      setAlert({ show: false, severity: "info", message: "" });
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:3001/users/register", {
        auth0Sub: user?.sub,
        password: user?.sub,
        ...form,
      });

      if (response.status === 200 || response.status === 201) {
        showAlert("success", "Profile updated successfully!");
        setShowRegistrationModal(false);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: unknown) {
      let errorMessage: string = "An error occurred";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      showAlert("error", `Failed to update profile: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <Alert severity="error">Error: {error.message}</Alert>}
      {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}

      {user && (
        <div
          className="mx-auto mt-8 p-6 w-full md:w-2/3 lg:w-1/2 rounded shadow"
          style={{
            backgroundColor: "#f0efef",
            borderColor: "#C99690",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.picture || ""}
              alt="profile"
              className="w-32 h-32 object-cover rounded-full border"
              style={{
                borderColor: "#C99690",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            />
            <h1 className="text-xl font-bold mt-4" style={{ color: "#333" }}>
              {user?.name}
            </h1>
            <p className="text-sm text-gray-700">{user?.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center">
              <TextField
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                disabled={!isEditable.address}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f1f3f8", 
                  },
                }}
              />
              <IconButton onClick={() => toggleEdit("address")} edge="end">
                <EditIcon sx={{ color: "#C99690" }} />
              </IconButton>
            </div>

            <div className="flex items-center">
              <TextField
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={!isEditable.phone}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f1f3f8", 
                  },
                }}
              />
              <IconButton onClick={() => toggleEdit("phone")} edge="end">
                <EditIcon sx={{ color: "#C99690" }} />
              </IconButton>
            </div>

            <button
              type="submit"
              className="rounded px-4 py-2 w-full text-white font-medium mt-2 transition ease-in-out hover:opacity-90"
              disabled={isSubmitting}
              style={{
                backgroundColor: "#C99690", 
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      )}

      {showRegistrationModal && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center 
            bg-black bg-opacity-50 backdrop-blur-sm
            transition-opacity duration-300
          "
        >
          <div
            className="
              max-w-sm w-full rounded shadow-lg p-6 
              border 
              animate-fadeIn
            "
            style={{
              backgroundColor: "#f0efef",
              borderColor: "#F0F0EA",  
              color: "#333",
            }}
          >
            <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
            <p className="mb-6">
              You must fill in and submit the form below to continue using the site.
            </p>
            <button
              onClick={() => setShowRegistrationModal(false)}
              className="
                px-4 py-2 rounded text-white 
                hover:opacity-90 transition-opacity
              "
              style={{
                backgroundColor: "#C99690",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
