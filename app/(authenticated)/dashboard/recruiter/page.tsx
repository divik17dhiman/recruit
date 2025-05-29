import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecruiterDashboard() {
  // Mock data - would come from Supabase in a real app
  const departments = [
    {
      name: "Computer Science",
      totalApplicants: 45,
      firstPrefCount: 32,
      secondPrefCount: 13,
      slug: "computer-science",
    },
    {
      name: "Electrical Engineering",
      totalApplicants: 38,
      firstPrefCount: 25,
      secondPrefCount: 13,
      slug: "electrical-engineering",
    },
    {
      name: "Mechanical Engineering",
      totalApplicants: 29,
      firstPrefCount: 18,
      secondPrefCount: 11,
      slug: "mechanical-engineering",
    },
  ]

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
        <p className="text-muted-foreground">Manage applications for your assigned departments</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <Link key={dept.slug} href={`/dashboard/recruiter/${dept.slug}`}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>{dept.name}</CardTitle>
                <CardDescription>Department overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Applicants</span>
                    <span className="font-medium">{dept.totalApplicants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">First Preference</span>
                    <span className="font-medium">{dept.firstPrefCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Second Preference</span>
                    <span className="font-medium">{dept.secondPrefCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
