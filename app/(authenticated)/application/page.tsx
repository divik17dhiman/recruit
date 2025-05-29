"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ApplicationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    registerNo: "",
    firstPrefDept: "",
    firstPrefReason: "",
    secondPrefDept: "",
    secondPrefReason: "",
    priorityReason: "",
    portfolioLink: "",
  })

  // Mock departments - would come from Supabase in a real app
  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
  ]

  // Mock deadline - would come from Supabase in a real app
  const deadline = new Date("2025-06-30")
  const today = new Date()
  const deadlinePassed = today > deadline

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Placeholder for Supabase data submission
    console.log("Submitting application:", formData)

    // Simulate submission
    setTimeout(() => {
      router.push("/dashboard")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Application Form</h1>
        <p className="text-muted-foreground">Please fill out the form below to submit your application.</p>
      </div>

      {deadlinePassed && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Application Closed</AlertTitle>
          <AlertDescription>
            The application deadline has passed. You can no longer submit or edit your application.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Please provide your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={deadlinePassed}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={deadlinePassed}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="registerNo">Register Number</Label>
              <Input
                id="registerNo"
                name="registerNo"
                value={formData.registerNo}
                onChange={handleChange}
                required
                disabled={deadlinePassed}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Department Preferences</CardTitle>
            <CardDescription>Select your preferred departments and provide reasons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstPrefDept">First Preference Department</Label>
                <Select
                  disabled={deadlinePassed}
                  onValueChange={(value) => handleSelectChange("firstPrefDept", value)}
                  value={formData.firstPrefDept}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstPrefReason">Reason for First Preference</Label>
                <Textarea
                  id="firstPrefReason"
                  name="firstPrefReason"
                  value={formData.firstPrefReason}
                  onChange={handleChange}
                  rows={3}
                  required
                  disabled={deadlinePassed}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="secondPrefDept">Second Preference Department</Label>
                <Select
                  disabled={deadlinePassed}
                  onValueChange={(value) => handleSelectChange("secondPrefDept", value)}
                  value={formData.secondPrefDept}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondPrefReason">Reason for Second Preference</Label>
                <Textarea
                  id="secondPrefReason"
                  name="secondPrefReason"
                  value={formData.secondPrefReason}
                  onChange={handleChange}
                  rows={3}
                  required
                  disabled={deadlinePassed}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priorityReason">Reason for Preference Priority</Label>
              <Textarea
                id="priorityReason"
                name="priorityReason"
                value={formData.priorityReason}
                onChange={handleChange}
                rows={3}
                required
                disabled={deadlinePassed}
                placeholder="Explain why you prioritized your preferences in this order"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Provide links to your portfolio, resume, or GitHub</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="portfolioLink">Portfolio/Resume/GitHub Link</Label>
              <Input
                id="portfolioLink"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleChange}
                placeholder="https://"
                disabled={deadlinePassed}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting || deadlinePassed}>
              {isSubmitting ? "Submitting..." : deadlinePassed ? "Deadline Passed" : "Submit Application"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
