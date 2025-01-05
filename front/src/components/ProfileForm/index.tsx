"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Alert, IconButton, TextField } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./index.module.css";
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

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const response = await axios.post("http://localhost:3001/users/check-or-create", {
            email: user.email,
            password: user.sub,
          });

          if (response.status === 200) {
            const { user } = response.data;
            setForm((prevForm) => ({ ...prevForm, address: user.address || "", phone: user.phone || "" }));
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [property]: value });
  };

  const toggleEdit = (field: "address" | "phone") => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };
    

  const showAlert = (severity: "success" | "error" | "info" | "warning", message: string) => {
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
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
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
        <ul className="flex flex-col justify-between w-1/2">
          <img
            src={user?.picture || undefined}
            alt="profile picture"
            className="w-1/2 h-1/2 object-cover rounded-full ml-auto mr-auto mt-4 mb-2"
          />
          <li>
            <p className={styles.label}>Name:</p>
            {user?.name && <p className={styles.input}>{user?.name}</p>}
          </li>
          <li>
            <p className={styles.label}>Email:</p>
            {user?.email && <p className={styles.input}>{user?.email}</p>}
          </li>
        </ul>
      )}

{user && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <div className="flex items-center">
            <TextField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              disabled={!isEditable.address}
              fullWidth
              variant="outlined"
            />
            <IconButton onClick={() => toggleEdit("address")} edge="end">
              <EditIcon />
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
            />
            <IconButton onClick={() => toggleEdit("phone")} edge="end">
              <EditIcon />
            </IconButton>
          </div>

          <button
            type="submit"
            className="transition duration-150 ease-in-out bg-blue-500 text-white p-2 hover:bg-blue-600 rounded mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>      )}
    </>
  );
}
