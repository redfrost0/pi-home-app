'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  

    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Rasberry Pi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="flex justify-around text-sm text-muted-foreground">
          <Link className={buttonVariants({ variant: "default" })} href="/stats">Stats</Link>
          <Button onClick={callAPI}>Check Headers</Button>
            </div>
            </CardContent>
        </Card>
      </main>
    );
  }

  const callAPI = async () => {
    try {
      const res = await fetch(`https://header-test.joelspi.org/listHeaders`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
}