import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import OutreachPageClient from "./outreach-page-client";

export const metadata = {
  title: "Outreach Log | SoloFrameHub",
};

export default async function OutreachPage() {
  const session = await getServerSession();
  if (!session?.uid) redirect("/signin");

  return <OutreachPageClient />;
}
