import { useState } from 'react';
import { Scale } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-center border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
            <Scale className="size-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-foreground">CaseManager</h1>
            <p className="text-sm text-muted-foreground">For Legal Professionals</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          {step === 'phone' ? (
            <>
              <div className="text-center space-y-2">
                <h2 className="text-foreground">Welcome</h2>
                <p className="text-muted-foreground">Enter your mobile number to continue</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <div className="flex gap-2">
                    <div className="w-16 h-12 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1 h-12 bg-input-background border-border"
                      maxLength={10}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSendOTP}
                  disabled={phone.length !== 10}
                  className="w-full h-12"
                  size="lg"
                >
                  Send OTP
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-2">
                <h2 className="text-foreground">Verify OTP</h2>
                <p className="text-muted-foreground">
                  Enter the 6-digit code sent to<br />+91 {phone}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="flex justify-center">
                    <InputOTP 
                      maxLength={6} 
                      value={otp}
                      onChange={setOtp}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="size-12" />
                        <InputOTPSlot index={1} className="size-12" />
                        <InputOTPSlot index={2} className="size-12" />
                        <InputOTPSlot index={3} className="size-12" />
                        <InputOTPSlot index={4} className="size-12" />
                        <InputOTPSlot index={5} className="size-12" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <Button 
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6}
                  className="w-full h-12"
                  size="lg"
                >
                  Verify & Continue
                </Button>

                <button
                  onClick={() => setStep('phone')}
                  className="w-full text-center text-sm text-muted-foreground"
                >
                  Change mobile number
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
