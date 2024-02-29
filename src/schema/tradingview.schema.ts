import { object, string, ref, date, number } from 'yup';
export const tradingview: any = {
    webhook: object({
      body: object({
        
        type: string().required(),
        exchange: string().required(),
        symbol: string().required('Symbol is required'),
        price: number().required('Symbol Price is required'),
        qty: number().required('Quantity is required'),
        datetime: string().required('TimeStamp is required'),
        timestamp: string().required('TimeStamp is required'),
        timeframe: string().required('Timeframe is required'),
        volume: number().required('TimeStamp is required'),
          
      })
    })
}