import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  };
}

// AbstractControl: Là lớp cơ sở cho các loại form control (FormGroup, FormControl, FormArray). Trong trường hợp này, AbstractControl đại diện cho FormGroup chứa các control password và confirmPassword.

// ValidationErrors: Là một object chứa các lỗi được trả về bởi validator. Ví dụ: { passwordMismatch: true }.

// ValidatorFn: Là kiểu dữ liệu đại diện cho hàm validator. Một validator function nhận vào một AbstractControl và trả về ValidationErrors (nếu có lỗi) hoặc null (nếu hợp lệ).
