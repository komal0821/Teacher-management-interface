import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Teacher Management System
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Create your account to get started
          </p>
        </div>
        
        {/* Sign Up Form */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200 w-full">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-[#B43F3F] hover:bg-[#A03636] text-white font-medium py-2 px-4 rounded-md transition-colors',
                card: 'shadow-none border-0 p-0 w-full',
                rootBox: 'w-full',
                headerTitle: 'text-slate-800 text-xl font-semibold text-center',
                headerSubtitle: 'text-slate-600 text-sm text-center mt-1',
                socialButtonsBlockButton: 'border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-4 rounded-md transition-colors w-full',
                socialButtonsBlockButtonText: 'font-medium',
                formFieldInput: 'border-slate-300 focus:border-[#B43F3F] focus:ring-[#B43F3F] focus:ring-1 rounded-md px-3 py-2 w-full text-sm',
                formFieldLabel: 'text-slate-700 text-sm font-medium',
                footerActionLink: 'text-[#B43F3F] hover:text-[#A03636] font-medium text-sm',
                dividerLine: 'bg-slate-200',
                dividerText: 'text-slate-500 text-sm',
                formFieldRow: 'space-y-1',
                form: 'space-y-4',
                socialButtonsProviderIcon: 'w-4 h-4',
                footer: 'text-center mt-4'
              },
              layout: {
                socialButtonsPlacement: 'top'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
