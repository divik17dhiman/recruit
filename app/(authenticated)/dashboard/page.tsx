import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ApplicantDashboard() {
  // Mock data - would come from Supabase in a real app
  const applicationStatus = "Pending"
  const applicationSubmitted = true
  const deadline = new Date("2025-06-30")
  const today = new Date()
  const deadlinePassed = today > deadline

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Applicant Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your application status.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Current status of your application</CardDescription>
          </CardHeader>
          <CardContent>
            {applicationSubmitted ? (
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    applicationStatus === "Pending"
                      ? "outline"
                      : applicationStatus === "Shortlisted"
                        ? "default"
                        : "destructive"
                  }
                >
                  {applicationStatus}
                </Badge>
                <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            ) : (
              <p className="text-amber-500">Not submitted yet</p>
            )}
          </CardContent>
          <CardFooter>
            {!applicationSubmitted && (
              <Link href="/application" className="w-full">
                <Button className="w-full" disabled={deadlinePassed}>
                  {deadlinePassed ? "Deadline Passed" : "Apply Now"}
                </Button>
              </Link>
            )}
            {applicationSubmitted && !deadlinePassed && (
              <Link href="/application" className="w-full">
                <Button variant="outline" className="w-full">
                  Edit Application
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Dates</CardTitle>
            <CardDescription>Key dates for the application process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Application Deadline</span>
              <span className="text-sm font-medium">{deadline.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Results Announcement</span>
              <span className="text-sm font-medium">July 15, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Orientation</span>
              <span className="text-sm font-medium">August 1, 2025</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Contact our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              If you have any questions or need assistance with your application, please contact our support team.
            </p>
            <p className="text-sm font-medium">support@recruitmentportal.com</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View FAQ
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
