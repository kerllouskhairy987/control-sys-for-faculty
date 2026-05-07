"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileHeader } from "@/components/student/profile-header";
import { PersonalInfo } from "@/components/student/personal-info";
import { AcademicInfo } from "@/components/student/academic-info";
import { ProfileActions } from "@/components/student/profile-actions";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [studentData, setStudentData] = useState({
    name: "Nour Aldin Mohamed",
    nationalId: "30301151801697",
    level: "Junior (Level 2)",
    department: "Intelligent Systems Engineering",
    educationEmail: "nour.aldin.mohamed@zewailcity.edu.eg",
    password: "********",
  });

  const [formData, setFormData] = useState(studentData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setStudentData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(studentData);
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-muted-50 animate-in fade-in duration-500">
      {/* 1. Header (Title & Edit Button) */}
      <ProfileHeader isEditing={isEditing} onEdit={() => setIsEditing(true)} />

      <Card className="mt-4">
        <CardContent className="pt-4 space-y-4">
          {/* 2. Personal Information (Editable) */}
          <PersonalInfo
            isEditing={isEditing}
            studentData={studentData}
            formData={formData}
            onChange={handleInputChange}
          />

          {/* 3. Academic Information (Read-only) */}
          <AcademicInfo studentData={studentData} />
        </CardContent>
      </Card>

      {/* 4. Action Buttons (Save & Cancel) */}
      <ProfileActions
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}