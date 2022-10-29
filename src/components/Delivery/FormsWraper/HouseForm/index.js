import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

import { useOrder } from '../../../../contexts/OrderContext';
import { CustomInput } from '../../../Shared/Inputs';

import {
  FieldRow,
  TitleAndError,
  FormTItle,
  FormError,
} from '../../../Shared/FormRows';

export const HouseForm = (props) => {

  const { updateOrderDetail } = props
  const [orderDetail] = useOrder();
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      block: orderDetail?.address?.block,
      street: orderDetail?.address?.street,
      avenue: orderDetail?.address?.avenue,
      house_no: orderDetail?.address?.house_no,
      additional: orderDetail?.address?.additional
    }
  });

  const onSubmit = (data) => {
    updateOrderDetail(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="addressForm">
      <FieldRow>
        <TitleAndError>
          <FormTItle>{t('Block')} *</FormTItle>
          <FormError>{errors.block?.message}</FormError>
        </TitleAndError>
        <CustomInput error={errors.block} width="100%"
          {...register("block", {
            required: `${t('Required')}`,
            pattern: {
              value: /^\d+$/i,
              message: t('This input is number only'),
            }
          })}
        />
      </FieldRow>

      <FieldRow>
        <TitleAndError>
          <FormTItle>{t('Street')} *</FormTItle>
          <FormError>{errors.street?.message}</FormError>
        </TitleAndError>
        <CustomInput error={errors.street} width="100%"
          {...register("street", { required: `${t('Required')}` })}
        />
      </FieldRow>

      <FieldRow>
        <TitleAndError>
          <FormTItle>{`${t('Avenue')} (${t('Optional')})`} </FormTItle>
          <FormError>{errors.avenue?.message}</FormError>
        </TitleAndError>
        <CustomInput width="100%" {...register("avenue", {
          pattern: {
            value: /^\d+$/i,
            message: t('This input is number only'),
          }
        })}
        />
      </FieldRow>

      <FieldRow>
        <TitleAndError>
          <FormTItle>{t('House No.')} *</FormTItle>
          <FormError>{errors.house_no?.message}</FormError>
        </TitleAndError>
        <CustomInput error={errors.house_no} width="100%"
          {...register("house_no", {
            required: `${t('Required')}`,
            pattern: {
              value: /^\d+$/i,
              message: t('This input is number only'),
            }
          })}
        />
      </FieldRow>

      <FieldRow>
        <TitleAndError>
          <FormTItle>{`${t('Additional')} (${t('additional')})`} </FormTItle>
        </TitleAndError>
        <CustomInput width="100%" {...register("additional")} />
      </FieldRow>
    </form>
  )
}