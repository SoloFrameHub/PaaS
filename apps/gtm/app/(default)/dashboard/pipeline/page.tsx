import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import PipelinePageClient from "./pipeline-page-client";

export const metadata = {
  title: "Pipeline | SoloFrameHub",
};

export default async function PipelinePage() {
  const session = await getServerSession();
  if (!session?.uid) redirect("/signin");

  return <PipelinePageClient />;
}
