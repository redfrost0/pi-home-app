'use client'
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LoadingSpinner } from '@/components/ui/loading';
const fetcher = (url: string | URL | Request) => fetch(url).then(r => {
  if (r.status >= 400) {
    throw new Error("You broke me api :(")
  }
  return r.json()
});

export default function Home() {
  //const { data, isLoading, error } = useSWR('https://sys-api.joelspi.org/stats', fetcher, { refreshInterval: 2000 })
  const { data, isLoading, error } = useSWR('http://127.0.0.1:8000/stats', fetcher, { refreshInterval: 2000 })
  if (error) {
    return (
      <main className="min-h-screen bg-slate-75 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6 text-foreground">😡</h1>
        <p>Leave me app alone</p>
      </main>
    )
  }
  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-75 flex flex-col items-center justify-center p-6">
        <LoadingSpinner />
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-slate-75 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Raspberry Pi</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 >OS</h3>
            {[
              ["Hostname", data.os.hostname],
              ["Platform", data.os.platform],
              ["Architecture", data.os.arch],
              ["CPU Temperature", `${data.cpuTemp.toFixed(1)}°C`],
              ["Up Time", data.os.upTime]
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}:</span>
                <span className="text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">CPU Usage</h3>
            {data.cpuPercent.map((usage: string, index: string | number) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Core {index}</span>
                  <br />
                  <span>{usage}%</span>
                </div>
                <Progress value={parseFloat(usage)} className="h-2" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Memory Usage</h3>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Used</span>
              <span>{data.memUsage.used} / {data.memUsage.total} MB</span>
            </div>
            <Progress
              value={data.memUsage.percent}
              className="h-2"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Disk Usage</h3>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{data.diskUsage[0].name}</span>
              <span>{data.diskUsage[0].used} / {data.diskUsage[0].total} GB</span>
            </div>
            <Progress
              value={data.diskUsage[0].percent}
              className="h-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{data.diskUsage[1].name}</span>
              <span>{data.diskUsage[1].used} / {data.diskUsage[1].total} GB</span>
            </div>
            <Progress
              value={data.diskUsage[1].percent}
              className="h-2"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Network Usage</h3>
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Download</span>
                <span className="text-foreground font-medium">{data.network.totalIn} MB</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Upload</span>
                <span className="text-foreground font-medium">{data.network.totalOut} MB</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Current Download</span>
              <span>{data.network.inSpeed} MBPS</span>
            </div>
            <Progress
              value={data.network.inSpeed / 600}
              className="h-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Current Upload</span>
              <span>{data.network.outSpeed} MBPS</span>
            </div>
            <Progress
              value={data.network.outSpeed / 600}
              className="h-2"
            />
          </div>

    

        </CardContent>
      </Card>
    </main>
  );
}