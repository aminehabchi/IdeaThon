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

import { fetcher, timeAgo } from '@/lib/helpers';
const statsData = [
  {
    title: "Total reports",
    value: "0",
    icon: AlertTriangle,
    bgColor: "bg-red-100"
  },
  {
    title: "Pending reports",
    value: "0",
    icon: Clock,
    bgColor: "bg-yellow-100"
  },
  {
    title: "Users banned",
    value: "0",
    icon: Ban,
    bgColor: "bg-orange-100"
  },
  {
    title: "Content removed",
    value: "0",
    icon: Trash2,
    bgColor: "bg-purple-100"
  }
];
export default function ReportsManagementDashboard() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [reports, setreports] = useState([])

  useEffect(() => {
    async function fetchInfo() {
      try {
        let s = selectedFilter
        if (s == "All") {
          s = ""
        }
        const data = await fetcher({
          url: `http://localhost:8080/api/report/info`,
          method: "POST",
          token: null,
          returned_status: 200,
        });
        console.log("Info data:", data);
        statsData[0].value = data.total_reports
        statsData[1].value = data.pending_reports
        statsData[2].value = data.users_banned
        statsData[3].value = data.content_removed
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    }

    fetchInfo();
  }, []);

  useEffect(() => {
    async function fetchReports() {
      try {
        let s = selectedFilter
        if (s == "All") {
          s = ""
        }
        const data = await fetcher({
          url: `http://localhost:8080/api/report/get`,
          method: "POST",
          token: null,
          data: { type: s },  // send the entire filter
          returned_status: 200,
        });
        console.log("Reports data:", data);
        setreports(data)
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    }

    fetchReports();
  }, [selectedFilter]);


  const filterOptions = ["All", "generale", "ideathon", "entrie"];

  const getInitialsColor = (initials) => {
    if (!initials) {
      initials = "CH"
    }
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
                    {reports?.map((report, index) => (

                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <Checkbox
                            checked={report.is_solved}
                          />
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <span className="text-sm font-medium text-gray-900">
                              #{report.id}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {timeAgo(report.created_at)}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${getInitialsColor(report.initials)}`}>
                              {report.initials | "none"}
                            </div>
                            <div>
                              <span className="text-sm text-gray-900 block">
                                {report.reporter || "none"}
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