import * as XLSX from 'xlsx';
import * as _ from 'lodash';
export class Excel {
   
  public static CONVERT_TO_JSON(excelBuffer: any): any {
    const workbook = XLSX.read(excelBuffer, {
      raw: false,
      // type: 'binary',
      // cellDates: true,
      // cellNF: false,
      // cellText: false
    });
    const sheetNameList = workbook.SheetNames;
    const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]], { defval: null });
    return json;
  }

  public static MULTIPLE_SHEET_CONVERT_TO_JSON(excelBuffer: any): any {
    const workbook: any = XLSX.read(excelBuffer);
    const sheetNameList: any = workbook.SheetNames;
    const json: any = {};
    _.each(sheetNameList, (sheetName, key) => {
      json[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });
    });
    return json;
  }

  public static date2ms(d: any): any {
    let date = new Date(Math.round((d - 25569) * 864e5));
    // date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
  }

  public static transform(array: any, keyToReplace: any): any {
    return array.map((item: any) => 
      Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          keyToReplace[key] || key,
          value
        ])
      )
    );
  }
}
