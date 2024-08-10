'use client'
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key } from 'react';
const fetcher = (url: string | URL | Request) => fetch(url).then(r => r.json())

export default function Home() {
  const { data, error } = useSWR('api/stats', fetcher, { refreshInterval: 2000 })
  console.log(data);
  console.log(error);
  // const systemInfo = await getSystemDetails();
  if (data) return (
    <main className="min-h-screen bg-slate-75 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Raspberry Pi</h1>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">OS</h3>
            {[
              ["Hostname", data.os.hostname],
              ["Platform", data.os.platform],
              ["Architecture", data.os.arch],
              ["CPU Temperature", `${data.cpuTemp.toFixed(1)}°C`],
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
              <span>Used</span>
              <span>{data.diskUsage.used} / {data.diskUsage.total} GB</span>
            </div>
            <Progress 
              value={data.diskUsage.percent} 
              className="h-2" 
            />
          </div>
          
        </CardContent>
      </Card>
    </main>
  );
}