import Link from "next/link";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface DocsSearchModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function DocsSearchModal({
  isOpen,
  setIsOpen,
}: DocsSearchModalProps) {
  return (
    <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogBackdrop
        transition
        className="fixed inset-0 z-[99999] bg-slate-900/30 transition-opacity duration-200 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 top-20 z-[99999] mb-4 flex items-start justify-center overflow-hidden px-4 sm:px-6 md:top-28">
        <DialogPanel
          transition
          className="max-h-full w-full max-w-2xl overflow-auto rounded-xl bg-white shadow-lg duration-300 ease-out data-closed:translate-y-4 data-closed:opacity-0 dark:bg-slate-800"
        >
          {/* Search form */}
          <form className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center">
              <label htmlFor="docs-search-modal">
                <span className="sr-only">Search</span>
                <svg
                  className="w-4 h-4 fill-slate-500 shrink-0 ml-4 dark:fill-slate-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m14.707 13.293-1.414 1.414-2.4-2.4 1.414-1.414 2.4 2.4ZM6.8 12.6A5.8 5.8 0 1 1 6.8 1a5.8 5.8 0 0 1 0 11.6Zm0-2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z" />
                </svg>
              </label>
              <input
                id="docs-search-modal"
                data-autofocus
                className="text-sm w-full bg-white border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-2 pr-4 dark:bg-slate-800 dark:placeholder:text-slate-500"
                type="search"
                placeholder="Search documentation..."
              />
            </div>
          </form>
          <div className="py-4 px-2 space-y-4">
            {/* Popular */}
            <div>
              <div className="text-sm font-medium text-slate-500 px-2 mb-2 dark:text-slate-400">
                Popular
              </div>
              <ul>
                <li>
                  <Link
                    className="flex items-center px-2 py-1 leading-6 text-sm text-slate-800 hover:bg-slate-100 rounded-sm dark:text-slate-200 dark:hover:bg-slate-700 focus-within:bg-slate-100 dark:focus-within:bg-slate-700 outline-hidden"
                    href="/docs/getting-started/quick-start"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-3 h-3 fill-slate-400 shrink-0 mr-3 dark:fill-slate-500"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z" />
                    </svg>
                    <span>Quick Start Guide</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center px-2 py-1 leading-6 text-sm text-slate-800 hover:bg-slate-100 rounded-sm dark:text-slate-200 dark:hover:bg-slate-700 focus-within:bg-slate-100 dark:focus-within:bg-slate-700 outline-hidden"
                    href="/docs/academy/course-tracks"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-3 h-3 fill-slate-400 shrink-0 mr-3 dark:fill-slate-500"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z" />
                    </svg>
                    <span>Course Tracks</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center px-2 py-1 leading-6 text-sm text-slate-800 hover:bg-slate-100 rounded-sm dark:text-slate-200 dark:hover:bg-slate-700 focus-within:bg-slate-100 dark:focus-within:bg-slate-700 outline-hidden"
                    href="/docs/academy/ai-coaching"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-3 h-3 fill-slate-400 shrink-0 mr-3 dark:fill-slate-500"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z" />
                    </svg>
                    <span>AI Coaching</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center px-2 py-1 leading-6 text-sm text-slate-800 hover:bg-slate-100 rounded-sm dark:text-slate-200 dark:hover:bg-slate-700 focus-within:bg-slate-100 dark:focus-within:bg-slate-700 outline-hidden"
                    href="/docs/help/faq"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-3 h-3 fill-slate-400 shrink-0 mr-3 dark:fill-slate-500"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z" />
                    </svg>
                    <span>FAQ</span>
                  </Link>
                </li>
              </ul>
            </div>
            {/* Actions */}
            <div>
              <div className="text-sm font-medium text-slate-500 px-2 mb-2">
                Actions
              </div>
              <ul>
                <li>
                  <Link
                    className="flex items-center px-2 py-1 leading-6 text-sm text-slate-800 hover:bg-slate-100 rounded-sm dark:text-slate-200 dark:hover:bg-slate-700 focus-within:bg-slate-100 dark:focus-within:bg-slate-700 outline-hidden"
                    href="/"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-3 h-3 fill-blue-600 shrink-0 mr-3"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.854.146a.5.5 0 0 0-.525-.116l-11 4a.5.5 0 0 0-.015.934l4.8 1.921 1.921 4.8A.5.5 0 0 0 7.5 12h.008a.5.5 0 0 0 .462-.329l4-11a.5.5 0 0 0-.116-.525Z" />
                    </svg>
                    <span className="font-medium">Go to Platform</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
