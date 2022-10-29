import React from 'react'
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

export const OfficeForm = (props) => {

  const { updateOrderDetail } = props
  const [orderDetail] = useOrder();
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      block: orderDetail?.address?.block,
      street: orderDetail?.address?.street,
      avenue: orderDetail?.address?.avenue,
      building: orderDetail?.address?.building,
      floor: orderDetail?.address?.floor,
      office_no: orderDetail?.address?.office_no,
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
        </TitleAndError>
        <CustomInput width="100%" {...register("avenue", {
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
          <FormTItle>{t('Building')} *</FormTItle>
          <FormError>{errors.building?.message}</FormError>
        </TitleAndError>
        <CustomInput error={errors.building} width="100%"
          {...register("building", {
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
          <FormTItle>{t('Floor')} *</FormTItle>
          <FormError>{errors.floor?.message}</FormError>
        </TitleAndError>
        <CustomInput error={errors.floor} width="100%"
          {...register("floor", {
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
          <FormTItle>{t('Office No.')} *</FormTItle>
          <FormError>{errors.office_no?.message}</FormError>
        </TitleAndError>
        <CustomInput error={errors.office_no} width="100%"
          {...register("office_no", {
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