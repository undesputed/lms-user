import api from 'src/api/api';
import { PaymentCreds, PaymentResponse } from 'src/reducers/payment/payment';

export function createNewPayment(
  credentials: PaymentCreds
): Promise<PaymentResponse> {
  return api
    .post<PaymentResponse>(`payment/`, credentials)
    .then((res) => res.data);
}
