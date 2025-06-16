import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordGeneratorService } from '../../services/password-generator.service';
import { EntropyService } from '../../services/entropy.service';

@Component({
  selector: 'app-password-generator',
  imports: [CommonModule, FormsModule],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss',
})
export class PasswordGeneratorComponent {
  length: number = 12;
  includeUppercase: boolean = false;
  includeNumbers: boolean = false;
  includeSpecialChars: boolean = false;
  generatedPassword: string = '';
  passwordEntropy: number = 0;
  passwordStrength: string = 'Very Weak';
  passwordStrengthColor: string = 'red';

  constructor(
    public passwordGeneratorService: PasswordGeneratorService,
    public entropyService: EntropyService
  ) {}

  generatePassword(): void {
    const { password } = this.passwordGeneratorService.generatePassword(
      this.length,
      this.includeUppercase,
      this.includeNumbers,
      this.includeSpecialChars
    );
    this.generatedPassword = password;
    this.passwordEntropy =
      this.entropyService.calculatePasswordEntropy(password);
    this.updatePasswordStrength();
  }

  updatePasswordStrength(): void {
    if (this.passwordEntropy < 36) {
      this.passwordStrength = 'Very Weak';
      this.passwordStrengthColor = 'Red';
    } else if (this.passwordEntropy < 60) {
      this.passwordStrength = 'Weak';
      this.passwordStrengthColor = 'orange';
    } else if (this.passwordEntropy < 120) {
      this.passwordStrength = 'Strong';
      this.passwordStrengthColor = 'green';
    } else {
      this.passwordStrength = 'Very Strong';
      this.passwordStrengthColor = 'darkgreen';
    }
  }

  onPasswordChange(newPassword: string): void {
    if (!newPassword) {
      this.passwordEntropy = 0;
      this.passwordStrength = 'Very Weak';
      this.passwordStrengthColor = 'red';
      return;
    }
    this.passwordEntropy =
      this.entropyService.calculatePasswordEntropy(newPassword);
    this.updatePasswordStrength();
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedPassword).then(() => {
      alert('Password copied to clipboard!');
    });
  }

  calculateStrengthWidth(entropy: number): number {
    const maxEntropy = 120;
    const normalizedEntropy = Math.min(entropy, maxEntropy);
    // Convert result to percentage
    return (normalizedEntropy / maxEntropy) * 100;
  }
}
