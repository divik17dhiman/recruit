"use client"

import { usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const pathname = usePathname()
  const isRecruiter = pathname.includes("/recruiter")

  // Mock data - would come from Supabase in a real app
  const applicantData = {
    name: "John Doe",
    email: "john@example.com",
    registerNo: "REG12345",
    applicationStatus: "Pending",
    firstPrefDept: "Computer Science",
    secondPrefDept: "Electrical Engineering",
    submittedOn: "May 15, 2025",
  }

  const recruiterData = {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Recruiter",
    departments: ["Computer Science", "Electrical Engineering", "Mechanical Engineering"],
    assignedSince: "January 10, 2025",
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          {isRecruiter
            ? "Your recruiter profile and department assignments"
            : "Your personal information and application summary"}
        </p>
      </div>

      {isRecruiter ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Name</div>
                <div>{recruiterData.name}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Email</div>
                <div>{recruiterData.email}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Role</div>
                <div>
                  <Badge variant="outline">{recruiterData.role}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Assigned Since</div>
                <div>{recruiterData.assignedSince}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Assignments</CardTitle>
              <CardDescription>Departments you are managing</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recruiterData.departments.map((dept) => (
                  <li key={dept} className="flex items-center justify-between rounded-md border p-3">
                    <span>{dept}</span>
                    <Badge>Active</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Name</div>
                <div>{applicantData.name}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Email</div>
                <div>{applicantData.email}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Register Number</div>
                <div>{applicantData.registerNo}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Summary</CardTitle>
              <CardDescription>Your application details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Status</div>
                <div>
                  <Badge variant="outline">{applicantData.applicationStatus}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">First Preference</div>
                <div>{applicantData.firstPrefDept}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Second Preference</div>
                <div>{applicantData.secondPrefDept}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Submitted On</div>
                <div>{applicantData.submittedOn}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
