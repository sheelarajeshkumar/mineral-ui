/* @flow */
import { ThemeProvider } from '../../../../../library/themes';
import Button from '../../../../../library/Button';
import DemoLayout from '../components/DemoLayout';
import Dialog from '../components/DemoDialog';

export default {
  id: 'rtl',
  title: 'Bidirectionality',
  description: `TODO`,
  scope: {
    Button,
    DemoLayout,
    Dialog,
    ThemeProvider
  },
  source: `
    <div dir="rtl">
      <ThemeProvider theme={{ direction: 'rtl' }}>
        <DemoLayout>
          <Dialog
            title="الأحكام والشروط"
            actions={[
              <Button minimal key="0">إلغاء</Button>,
              <Button primary key="1">قبول الشروط</Button>
            ]}>
              <p>
                ان يبق إستعمل بأضرار الإحتفاظ, هذا إذ ا وبالرغم. أوسع الشهيرة ٣٠ تلك, بحث ثم أوسع أجزاء, مع فصل ودول وسوء الحيلولة. عن مكن المارق واتّجه الإقتصادي, رئيس يعادل الأسيوي كان من, المحيط بتحدّي إذ جُل. تم يتم فرنسا العالم. فقد قد تمهيد الأرواح. ليركز تغييرات أخذ ما, عن جعل بمباركة الولايات.
              </p>
          </Dialog>
        </DemoLayout>
      </ThemeProvider>
    </div>`
};
