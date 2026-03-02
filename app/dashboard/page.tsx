"use client";

import * as S from "./Dashboard.styles";
import { useActivities } from "../hooks/useActivities";
import Link from "next/link";
import { useProjects } from "../hooks/useProjects";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Legend } from "recharts";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Status } from "../types";
import { ChartPortal } from "../components/ChartPortal";

export default function DashboardPage() {
  const { activities, loading } = useActivities();
  const { projects } = useProjects();

  const CHART_COLORS = {
    [Status.PENDING]: "#6366f1",
    [Status.PROCESS]: "#f59e0b",
    [Status.COMPLETED]: "#10b981",
  };

  const completedCount = activities.filter(
    (a) => a.status === Status.COMPLETED,
  ).length;
  const pendingCount = activities.filter(
    (a) => a.status !== Status.COMPLETED,
  ).length;

  const taskData = [
    {
      name: "Pending",
      value: pendingCount,
      fill: CHART_COLORS[Status.PENDING],
    },
    {
      name: "Completed",
      value: completedCount,
      fill: CHART_COLORS[Status.COMPLETED],
    },
  ];
  const completedProjCount = projects.filter(
    (p) => p.status === Status.COMPLETED,
  ).length;
  const pendingProjCount = projects.filter(
    (p) => p.status !== Status.COMPLETED,
  ).length;

  const projectData = [
    {
      name: "Pending",
      value: pendingProjCount,
      fill: CHART_COLORS[Status.PENDING],
    },
    {
      name: "completed",
      value: completedProjCount,
      fill: CHART_COLORS[Status.COMPLETED],
    },
  ];

  return (
    <S.LayoutContainer>
      <S.ContentArea>
        <S.MainWrapper>
          <S.DashboardContainer>
            <S.HeaderRow>
              <S.Title>Dashboard</S.Title>
            </S.HeaderRow>
            <S.SectionHeader>
              <h3>Recent Activites</h3>
              <Link href="/tasks">
                <button>View All tasks</button>
              </Link>
            </S.SectionHeader>
            <S.ActivityList>
              {loading ? (
                <p>Loading Activites...</p>
              ) : (
                activities.map((activity) => (
                  <S.ActivityCard key={activity.id}>
                    <S.IconWrapper $status={activity.status}>
                      {activity.status === "completed" ? (
                        <CheckBadgeIcon className="size-6" />
                      ) : (
                        "+"
                      )}
                    </S.IconWrapper>
                    <S.ActivityInfo>
                      <h4>
                        {activity.status === "completed"
                          ? "Task Completed"
                          : "New Task added"}
                      </h4>
                      <p>
                        {activity.name} for {activity.project} for deadline{" "}
                        {activity.endDate}
                      </p>
                    </S.ActivityInfo>

                    <S.ActivityMeta>
                      <span>By: {activity.createdByName}</span>
                      <span>To: {activity.assignedTo}</span>
                    </S.ActivityMeta>
                  </S.ActivityCard>
                ))
              )}
            </S.ActivityList>
          </S.DashboardContainer>
          <S.StatsSidebar>
            <S.ChartCard>
              <h4>Task Overview</h4>
              <div
                id="task-chart-target"
                style={{ width: "100%", height: "100%" }}
              ></div>
              <ChartPortal selector="#task-chart-target">
                <S.ChartWrapper>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={taskData}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                      />
                      <Tooltip wrapperStyle={{ outline: "none" }} />
                      <Legend
                        iconType="circle"
                        wrapperStyle={{
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                    <S.ChartCenterLabel>
                      <h3>{activities.length}</h3>
                      <span>Total Tasks</span>
                    </S.ChartCenterLabel>
                  </ResponsiveContainer>
                </S.ChartWrapper>
              </ChartPortal>
            </S.ChartCard>
            <S.ChartCard>
              <h4>Project Overview</h4>

              <S.ChartWrapper>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="80%"
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      stroke="none"
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                  <S.ChartCenterLabel>
                    <h3>{projects.length}</h3>
                    <span>Total Projects</span>
                  </S.ChartCenterLabel>
                </ResponsiveContainer>
              </S.ChartWrapper>
            </S.ChartCard>
          </S.StatsSidebar>
        </S.MainWrapper>
      </S.ContentArea>
    </S.LayoutContainer>
  );
}
