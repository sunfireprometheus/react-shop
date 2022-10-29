import React from 'react'
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useOrder } from '../../../contexts/OrderContext';
import { CustomInput } from '../../Shared/Inputs'

import {
  FieldRow,
  TitleAndError,
  FormTItle,
  FormError,
} from '../../Shared/FormRows';
import {
  ContactContentContainer,
  ContactInfoContainer,
  ContactContentTItle
} from './styles';

export const ContactContent = () => {

  const history = useHistory();
  const { t } = useTranslation();
  const [orderDetail, { updateOrder }] = useOrder();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: orderDetail?.contact?.name,
      phone: orderDetail?.contact?.phone
    }
  });

  const onSubmit = (data) => {
    const changes = {
      contact: {
        name: data?.name,
        phone: data?.phone
      }
    }
    updateOrder(changes);
    history.push('/delivery');
  }

  return (
    <ContactContentContainer>
      <form onSubmit={handleSubmit(onSubmit)} id="contactForm">
        <ContactInfoContainer>
          <ContactContentTItle>
            {t('Contact Information')}
          </ContactContentTItle>

          <FieldRow>
            <TitleAndError>
              <FormTItle>{t('Name')} *</FormTItle>
              <FormError>{errors.name?.message}</FormError>
            </TitleAndError>
            <CustomInput error={errors.name} width="100%"
              {...register("name", { required: `${t('Required')}` })}
            />
          </FieldRow>

          <FieldRow>
            <TitleAndError>
              <FormTItle>{t('Phone Number')} *</FormTItle>
              <FormError>{errors.phone?.message}</FormError>
            </TitleAndError>
            <CustomInput error={errors.phone} width="100%" type="text" maxLength={8}
              pattern="[0-9]{8}" inputMode='numeric'
              onKeyPress={(e) => {
                if (!/^[0-9.]$/.test(e.key)) {
                  e.preventDefault()
                }
              }}
              {...register("phone", {
                required: `${t('Required')}`,
                minLength: {
                  value: 8,
                  message: `${t('phone_length')}`
                },
                maxLength: {
                  value: 8,
                  message: `${t('phone_length')}`
                }
              })
              }

            />
          </FieldRow>

        </ContactInfoContainer>

      </form>
    </ContactContentContainer>
  )
}
