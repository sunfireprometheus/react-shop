import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { BsCalendarDate } from "react-icons/bs";
import moment from "moment";
import "moment-timezone";

import { useOrder } from '../../contexts/OrderContext'
import { DateTimeModal } from './DateTimeModal'
import { CustomLink } from '../Shared/CustomLink'

import {
  DateTimeContainer,
  SelectedDateTime,
  DeliverVal
} from './styles';

export const DeliveryDateTime = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const [orderDetail] = useOrder();

  const closeHandleClick = () => {
    setIsModalOpen(false);
  }

  const isDiffOneHour = () => {
    const deliveryTimeMoment = moment(orderDetail.deiveryTime.date + ':' + orderDetail.deiveryTime.time, "YYYY/MM/DD:ha");
    const currentMoment = moment().tz("Asia/Kuwait");
    return deliveryTimeMoment.date() === currentMoment.date() && (deliveryTimeMoment.hour() - currentMoment.hour()) <= 1
  }
  return (
    <>
      <DateTimeContainer>
        <SelectedDateTime>
          <BsCalendarDate size="18" />
          <span>{t('Scheduled time')}: {isDiffOneHour() ? <DeliverVal>{'1 ' + t('Hour')}</DeliverVal> :
            <>
              <DeliverVal>{orderDetail?.deiveryTime?.date}</DeliverVal>
              <DeliverVal dir="ltr">{t(orderDetail?.deiveryTime?.time)}</DeliverVal>
            </>
          }
          </span>
        </SelectedDateTime>
        <CustomLink onClick={() => setIsModalOpen(true)} size={16}>
          {t('Change')}
        </CustomLink>
      </DateTimeContainer>

      {isModalOpen && <DateTimeModal closeHandleClick={closeHandleClick} />}
    </>
  )
}