import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Teacher Management System</h1>
          <p className="text-slate-600">Create your account to get started</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-[#B43F3F] hover:bg-[#A03636] text-white',
                card: 'shadow-none border-0',
                headerTitle: 'text-slate-800',
                headerSubtitle: 'text-slate-600',
                socialButtonsBlockButton: 'border-slate-300 hover:bg-slate-50',
                formFieldInput: 'border-slate-300 focus:border-[#B43F3F] focus:ring-[#B43F3F]',
                footerActionLink: 'text-[#B43F3F] hover:text-[#A03636]'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
