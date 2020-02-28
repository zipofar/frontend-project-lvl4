import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: {
          modal: {
            close: 'Close',
            confirmDeleteionChannel: 'Confirm deletion channel',
            removeChannel: 'Remove Channel',
            remove: 'Remove',
            save: 'Save',
            createChannel: 'Create Channel',
            editChannel: 'Edit Channel',
            requiredChannelName: 'Required channel name',
            lengthChannelName: 'Channel name is longer than {{maxLength}} symbols',
            enterChannelName: 'Enter channel name',
          },
          nameChannelsPanel: 'Channels',
        },
      },
    },
  });

export default i18n;
