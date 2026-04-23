'use client';

export default function OpenAdvisorButton({ label = 'Open Advisor' }: { label?: string }) {
    return (
        <button
            onClick={() => { window.dispatchEvent(new CustomEvent('open-flyout-chat')); }}
            className="text-sm font-bold bg-white text-primary-500 px-4 py-2 rounded-lg hover:bg-primary-50 block text-center w-full"
        >
            {label}
        </button>
    );
}
