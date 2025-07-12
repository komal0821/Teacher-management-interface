import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-6 sm:py-8">
      <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 leading-tight px-2">
            Teacher Management System
          </h1>
          <p className="text-sm sm:text-base text-slate-600 px-2">
            Sign in to access your dashboard
          </p>
        </div>
        
        {/* Clerk Sign In - No Background Card */}
        <div className="w-full">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-[#B43F3F] hover:bg-[#A03636] text-white font-medium py-3 px-4 rounded-md transition-colors w-full text-sm sm:text-base min-h-[44px]',
                card: 'shadow-none border-0 p-0 w-full max-w-none bg-transparent',
                rootBox: 'w-full max-w-none bg-transparent',
                headerTitle: 'text-slate-800 text-lg sm:text-xl font-semibold text-center mb-3',
                headerSubtitle: 'text-slate-600 text-sm text-center mb-4',
                socialButtonsBlockButton: 'border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-md transition-colors w-full text-sm min-h-[44px] bg-white',
                socialButtonsBlockButtonText: 'font-medium text-sm',
                formFieldInput: 'border-slate-300 focus:border-[#B43F3F] focus:ring-[#B43F3F] focus:ring-1 rounded-md px-3 py-3 w-full text-sm bg-white min-h-[44px]',
                formFieldLabel: 'text-slate-700 text-sm font-medium mb-2 block',
                footerActionLink: 'text-[#B43F3F] hover:text-[#A03636] font-medium text-sm',
                dividerLine: 'bg-slate-200',
                dividerText: 'text-slate-500 text-sm px-4 bg-gray-50',
                formFieldRow: 'space-y-2 mb-4',
                form: 'space-y-4 w-full bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200',
                socialButtonsProviderIcon: 'w-4 h-4',
                footer: 'text-center mt-6 pt-4 bg-white',
                main: 'w-full bg-transparent',
                formContainer: 'w-full bg-transparent',
                socialButtons: 'w-full space-y-3 mb-6',
                formFieldInputShowPasswordButton: 'text-slate-500 hover:text-slate-700 min-h-[44px] min-w-[44px]',
                identityPreview: 'bg-slate-50 border border-slate-200 rounded-md p-3 text-sm',
                formResendCodeLink: 'text-[#B43F3F] hover:text-[#A03636] text-sm font-medium',
                otpCodeFieldInput: 'border-slate-300 focus:border-[#B43F3F] focus:ring-[#B43F3F] rounded-md text-center text-lg font-mono min-h-[44px]',
                formFieldAction: 'text-[#B43F3F] hover:text-[#A03636] text-sm font-medium',
                alternativeMethodsBlockButton: 'text-[#B43F3F] hover:text-[#A03636] text-sm font-medium bg-white border border-slate-300 py-2 px-4 rounded-md min-h-[44px]'
              },
              layout: {
                socialButtonsPlacement: 'top',
                showOptionalFields: true
              },
              variables: {
                colorPrimary: '#B43F3F',
                colorText: '#1e293b',
                colorTextSecondary: '#64748b',
                colorBackground: 'transparent',
                colorInputBackground: '#ffffff',
                colorInputText: '#1e293b',
                borderRadius: '0.375rem',
                fontFamily: 'Inter, system-ui, sans-serif',
                spacingUnit: '1rem'
              }
            }}
            redirectUrl="/"
          />
        </div>
      </div>
    </div>
  );
}
