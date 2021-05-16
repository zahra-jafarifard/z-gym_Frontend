import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
          "Add New":"Add New","Members":"Members","Edit":"Edit","Delete":"Delete","Groups":"Groups",
          "Name":"Name","Back":"Back","Password":"Password","Update":"Update","Description":"Description",
          "Last Name":"Last Name","Insert":"Insert","Statuses":"Statuses",
          "Mobile":"Mobile","Create New Account":"Create New Account",
          "Status":"Status","Facebook":"Facebook","Twitter":"Twitter",
          "Weight":"Weight","Repeat Password":"Repeat Password","Set New Password":"Set New Password",
          "Height":"Height","not registered yet?": "not registered yet?",
          "BirthDay":"BirthDay","Reset Password":"Reset Password","New Password":"New Password",
          "Gender":"Gender","Forget Password":"Forget Password","Remember Me":"Remember Me","Register":"Register",
          "User Group":"User Group ","Categories":"Categories","Equipment":"Equipment",
          "Search":"Search","Icon":"Icon","Category":"Category","Exercises":"Exercises","Login":"Login",
          "Dear friend, if you have not registered yet, Choose not registered yet?":
          "Dear friend, if you have not registered yet, Choose not registered yet?",
          "Location":"Location", "Address":"Address", "Phone Number":"Phone Number","gender":"gender",
          "manager":"manager","Gyms":"Gyms","gymsType":"gymsType","GymTypes":"GymTypes",
          "CreatedBy":"CreatedBy","Start Date":"Start Date","End Date":"End Date" , "User":"User",
          "WorkOuts":"WorkOuts"


          
      }
    },
    fa: {
      translations: {
        "CreatedBy":"ایجاد شده توسط" ,"Start Date":"تاریخ شروع","End Date":"تاریخ پایان",
        "User":"کاربر" ,"WorkOuts":"برنامه های ورزشی",
         "manager":"مدیر" , "Gyms":"سالن های ورزشی","gymsType":"نوع باشگاه ها","GymTypes":"انواع سالن های ورزشی",
        "Location":"موقعیت مکانی","Address":"آدرس","Phone Number":"شماره تلفن","gender":"جنسیت",
          "Add New":"اضافه کردن رکورد جدید","Members":"اعضا","Edit":"ویرایش", "Delete":"حذف",
          "Name":"نام","Back":"بازگشت","Insert":"اضافه کردن","Update":"به روز رسانی","Statuses":"وضعیت ها",
          "Last Name":"فامیلی","Password":"رمز عبور","Groups":"گروه ها","Description":"توضیحات",
          "Mobile":"موبایل","Icon":"نماد","Category":"دسته بندی","Exercises":"تمرین ها",
          "Status":"وضعیت","Categories":"دسته بندی ها","Equipment":"تجهیزات","Reset Password":"تنظیم مجدد رمز عبور",
          "Weight":"وزن","Muscles":"ماهیچه ها","Forget Password":"فراموشی رمز عبور","Login":"ورود",
          "Height":"قد","Remember Me":"مرا به خاطر بسپار","Create New Account":"ایجاد حساب کاربری",
          "BirthDay":"تاریخ تولد","Register":"ثبت نام","Repeat Password":"تکرار رمز عبور",
          "Gender":"جنسیت","not registered yet?":"تاکنون ثبت نام نکرده اید؟",
          "User Group":"گروه کاربری","Facebook":"فیسبوک","Twitter":"توییتر","New Password":"رمز عبور جدید",
          "Search":"جستجو","Set New Password":"تنظیم رمز جدید",
          "Dear friend, if you have not registered yet, Choose not registered yet?":
         "دوست عزیز، در صورتی که تاکنون ثبت‌نام نکرده‌اید،  گزینه تاکنون ثبت نام نکرده‌اید؟ را انتخاب کنید",

          
      }
    },

    

  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },
  
  react: {
    wait: true,
    useSuspense: false
 },
});

export default i18n;
