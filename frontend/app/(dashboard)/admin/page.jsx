"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DashboardNavbar } from '@/components/navbarcomps/dashboardNavbar';
import {
  AlertTriangle,
  Users,
  MessageSquare,
  Shield,
  Trash2,
  Eye,
  Ban,
  Flag,
  Clock
} from 'lucide-react';
import { fetcher } from '@/lib/helpers';

export default function ReportsManagementDashboard() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await fetcher({
          url: `http://localhost:8080/api/report/get`,
          method: "POST",
          token: null,
          data: selectedFilter,  // send the entire filter
          returned_status: 200,
        });
        console.log("Reports data:", data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    }

    fetchReports();
  }, [selectedFilter]);

  const statsData = [
    {
      title: "Total reports",
      value: "1502",
      icon: AlertTriangle,
      bgColor: "bg-red-100"
    },
    {
      title: "Pending reports",
      value: "1,525",
      icon: Clock,
      bgColor: "bg-yellow-100"
    },
    {
      title: "Users banned",
      value: "150",
      icon: Ban,
      bgColor: "bg-orange-100"
    },
    {
      title: "Content removed",
      value: "342",
      icon: Trash2,
      bgColor: "bg-purple-100"
    }
  ];

  const reportsData = [
    {
      id: "#192541",
      reporter: "Esther Howard",
      initials: "EH",
      email: "esther.howard@email.com",
      subject: "Inappropriate content in idea submission",
      type: "ideathon",
      issue: "inappropriate",
      description: "This user posted offensive content in their idea submission that violates community guidelines",
      created_at: "2 hours ago",
      checked: false
    },
    {
      id: "#192540",
      reporter: "David Miller",
      initials: "DM",
      email: "david.miller@email.com",
      subject: "Spam messages in comments",
      type: "generale",
      issue: "spam",
      description: "User is sending spam messages repeatedly in idea comments",
      created_at: "5 hours ago",
      checked: false
    },
    {
      id: "#192539",
      reporter: "James Moore",
      initials: "JM",
      email: "james.moore@email.com",
      subject: "Harassment in ideathon discussion",
      type: "ideathon",
      issue: "harassment",
      description: "User is harassing other participants during ideathon sessions",
      created_at: "1 day ago",
      checked: true
    },
    {
      id: "#192538",
      reporter: "Robert Anderson",
      initials: "RA",
      email: "robert.anderson@email.com",
      subject: "Copyright violation in entry",
      type: "entrie",
      issue: "copyright",
      description: "Entry contains copyrighted material without permission",
      created_at: "1 day ago",
      checked: false
    },
    {
      id: "#192537",
      reporter: "Jessica Martinez",
      initials: "JM",
      email: "jessica.martinez@email.com",
      subject: "Misinformation in idea description",
      type: "ideathon",
      issue: "misinformation",
      description: "Idea contains false claims and misleading information",
      created_at: "2 days ago",
      checked: false
    },
    {
      id: "#192536",
      reporter: "William Jackson",
      initials: "WJ",
      email: "william.jackson@email.com",
      subject: "Security vulnerability report",
      type: "generale",
      issue: "security",
      description: "Found potential security issue in the platform",
      created_at: "2 days ago",
      checked: false
    },
    {
      id: "#192535",
      reporter: "Christopher Harris",
      initials: "CH",
      email: "christopher.harris@email.com",
      subject: "Feature request for better moderation",
      type: "generale",
      issue: "feature",
      description: "Requesting better moderation tools for community management",
      created_at: "3 days ago",
      checked: true
    },
    {
      id: "#192534",
      reporter: "Marcus Kenter",
      initials: "MK",
      email: "marcus.kenter@email.com",
      subject: "Bug in entry submission",
      type: "entrie",
      issue: "bug",
      description: "Unable to submit entry due to technical issue",
      created_at: "3 days ago",
      checked: false
    },
    {
      id: "#192533",
      reporter: "Joshua Thompson",
      initials: "JT",
      email: "joshua.thompson@email.com",
      subject: "Illegal content shared",
      type: "ideathon",
      issue: "illegal",
      description: "User shared illegal content during ideathon presentation",
      created_at: "4 days ago",
      checked: false
    },
    {
      id: "#192532",
      reporter: "Mason Martin",
      initials: "MM",
      email: "mason.martin@email.com",
      subject: "General inquiry about platform rules",
      type: "generale",
      issue: "general",
      description: "Question about community guidelines and platform policies",
      created_at: "5 days ago",
      checked: true
    }
  ];

  const filterOptions = ["All", "generale", "ideathon", "entrie"];

  const getInitialsColor = (initials) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500"
    ];
    return colors[initials.charCodeAt(0) % colors.length];
  };

  const getTypeColor = (type) => {
    const colors = {
      "generale": "bg-blue-100 text-blue-800",
      "ideathon": "bg-green-100 text-green-800",
      "entrie": "bg-purple-100 text-purple-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getIssueColor = (issue) => {
    const severityColors = {
      "spam": "bg-yellow-100 text-yellow-800",
      "harassment": "bg-red-100 text-red-800",
      "misinformation": "bg-orange-100 text-orange-800",
      "inappropriate": "bg-red-100 text-red-800",
      "copyright": "bg-pink-100 text-pink-800",
      "illegal": "bg-red-100 text-red-800",
      "security": "bg-red-100 text-red-800",
      "bug": "bg-blue-100 text-blue-800",
      "feature": "bg-green-100 text-green-800",
      "general": "bg-gray-100 text-gray-800",
      "other": "bg-gray-100 text-gray-800"
    };
    return severityColors[issue] || "bg-gray-100 text-gray-800";
  };

  const getActionButtons = (type, issue) => {
    const isCritical = ['harassment', 'illegal', 'inappropriate', 'security'].includes(issue);

    return (
      <div className="flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          className="text-blue-700 border-blue-300 hover:bg-blue-50"
        >
          <Eye className="h-3 w-3 mr-1" />
          Review
        </Button>
        {isCritical && (
          <>
            <Button
              size="sm"
              variant="outline"
              className="text-orange-700 border-orange-300 hover:bg-orange-50"
            >
              <Ban className="h-3 w-3 mr-1" />
              Ban User
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-700 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-gray-50 p-6">

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-2 rounded-full ${stat.bgColor}`}>
                      <stat.icon className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reports Table */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <Flag className="h-5 w-5 mr-2 text-red-500" />
                  Reports
                </CardTitle>
                <div className="flex space-x-2">
                  {filterOptions.map((filter, index) => (
                    <Button
                      key={index}
                      variant={filter === selectedFilter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter)}
                      className={filter === selectedFilter ?
                        "bg-gray-900 text-white hover:bg-gray-800" :
                        "text-gray-600 border-gray-300 hover:bg-gray-50"
                      }
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-3 px-6 w-12">
                        <Checkbox />
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Report ID
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Reporter
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Type
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Issue
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Subject & Description
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportsData.map((report, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <Checkbox
                            checked={report.checked}
                          />
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <span className="text-sm font-medium text-gray-900">
                              {report.id}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {report.created_at}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${getInitialsColor(report.initials)}`}>
                              {report.initials}
                            </div>
                            <div>
                              <span className="text-sm text-gray-900 block">
                                {report.reporter}
                              </span>
                              <span className="text-xs text-gray-500">
                                {report.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${getTypeColor(report.type)}`}
                          >
                            {report.type}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getIssueColor(report.issue)}`}
                          >
                            {report.issue}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 max-w-xs">
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {report.subject}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {report.description}
                            </p>                        </div>
                        </td>
                        <td className="py-4 px-6">
                          {getActionButtons(report.type, report.issue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}