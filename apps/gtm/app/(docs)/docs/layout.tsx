import DocsProvider from "@/components/docs/docs-provider";
import DocsHeader from "@/components/docs/ui/docs-header";
import DocsSidebar from "@/components/docs/ui/docs-sidebar";

export const metadata = {
  title: "Documentation | Solo GTM OS",
  description:
    "Comprehensive documentation for Solo GTM OS — the operating system for solo founder customer acquisition.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsProvider>
      <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <DocsHeader />

        <main className="grow">
          <section className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div>
                <DocsSidebar />

                <div className="md:grow md:pl-64 lg:pr-6 xl:pr-0">
                  <div className="pt-24 md:pt-28 pb-8 md:pl-6 lg:pl-12">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </DocsProvider>
  );
}
