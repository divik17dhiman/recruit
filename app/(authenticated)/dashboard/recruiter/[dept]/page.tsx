"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, UserCheck, UserX, Clock } from "lucide-react"

export default function DepartmentPage() {
  const params = useParams()
  const deptSlug = params.dept as string
  const deptName = deptSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data - would come from Supabase in a real app
  const departmentData = {
    name: deptName,
    totalApplicants: 45,
    firstPrefCount: 32,
    secondPrefCount: 13,
    recruiters: ["Jane Smith", "Robert Johnson", "Emily Davis"],
  }

  const applicants = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      registerNo: "REG001",
      preference: "First",
      status: "Pending",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      registerNo: "REG002",
      preference: "First",
      status: "Shortlisted",
    },
    {
      id: "3",
      name: "Charlie Brown",
      email: "charlie@example.com",
      registerNo: "REG003",
      preference: "Second",
      status: "Waitlisted",
    },
    {
      id: "4",
      name: "Diana Prince",
      email: "diana@example.com",
      registerNo: "REG004",
      preference: "First",
      status: "Rejected",
    },
    {
      id: "5",
      name: "Edward Norton",
      email: "edward@example.com",
      registerNo: "REG005",
      preference: "Second",
      status: "Pending",
    },
  ]

  // Filter applicants based on search query and status filter
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.registerNo.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || applicant.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "shortlisted":
        return <Badge className="bg-green-500">Shortlisted</Badge>
      case "waitlisted":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Waitlisted
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "shortlisted":
        return <UserCheck className="h-4 w-4 text-green-500" />
      case "waitlisted":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "rejected":
        return <UserX className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{departmentData.name} Department</h1>
        <p className="text-muted-foreground">Manage applications for this department</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{departmentData.totalApplicants}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">First Preference</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{departmentData.firstPrefCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Second Preference</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{departmentData.secondPrefCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Other Recruiters</CardTitle>
          <CardDescription>Other recruiters with access to this department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {departmentData.recruiters.map((recruiter) => (
              <Badge key={recruiter} variant="outline">
                {recruiter}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applicants</CardTitle>
          <CardDescription>Manage applicants for {departmentData.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applicants..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="waitlisted">Waitlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Register No</TableHead>
                  <TableHead className="hidden sm:table-cell">Preference</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplicants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No applicants found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="font-medium">
                        <Link href={`/profile?id=${applicant.id}`} className="hover:underline">
                          {applicant.name}
                        </Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{applicant.email}</TableCell>
                      <TableCell>{applicant.registerNo}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          variant="outline"
                          className={applicant.preference === "First" ? "border-primary text-primary" : ""}
                        >
                          {applicant.preference}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(applicant.status)}
                          {getStatusBadge(applicant.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="h-8">
                            View
                          </Button>
                          <Select>
                            <SelectTrigger className="h-8 w-[110px]">
                              <SelectValue placeholder="Update" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="shortlist">Shortlist</SelectItem>
                              <SelectItem value="waitlist">Waitlist</SelectItem>
                              <SelectItem value="reject">Reject</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
