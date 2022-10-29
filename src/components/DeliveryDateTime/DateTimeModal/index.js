import React, { useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiCircle, FiCheckCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import "moment-timezone";
import { Button } from '../../Shared/Buttons'
import { useOrder } from '../../../contexts/OrderContext'
import { useTheme } from '../../../contexts/ThemeContext'

import {
  ModalContainer,
  ModalDialog,
  ModalBody,
  ModalFooter
} from '../../Shared/SideModal'
import { FixedHeader, GobackTitle } from '../../Layout/FixedHeader'
import {
  FieldRow,
  // TitleAndError,
  // FormTItle,
} from '../../Shared/FormRows';
// import { CustomSelect } from '../../Shared/Selects';
import {
  MainContainer,
  CalendarContainer,
  DateTimeContainer,
  RadioGroup,
  Radio,
  ScheduleOption,
  ScheduleOrder
} from './styles';

export const DateTimeModal = (props) => {
  const { closeHandleClick } = props
  const [orderDetail, { updateOrder }] = useOrder();
  const [theme] = useTheme();

  const currentLng = localStorage.getItem('i18nextLng');
  const { t } = useTranslation();
  const [choosenDate, setChoosenDate] = useState(new Date(orderDetail.deiveryTime.date));
  const [choosenTime, setChoosenTime] = useState(orderDetail.deiveryTime.time);
  const currentHour = moment().tz("Asia/Kuwait").hour();

  const isDiffOneHour = () => {
    const deliveryTimeMoment = moment(orderDetail.deiveryTime.date + ':' + orderDetail.deiveryTime.time, "YYYY/MM/DD:ha");
    const currentMoment = moment().tz("Asia/Kuwait");
    return orderDetail?.isEnabledASAP && deliveryTimeMoment.date() === currentMoment.date() && (deliveryTimeMoment.hour() - currentMoment.hour()) <= 1
  }

  const [oneHour, setOneHour] = useState(isDiffOneHour())
  const minDate = currentHour + 1 < orderDetail?.maxTime
    ? new Date(moment().tz("Asia/Kuwait").format('YYYY/MM/DD'))
    : new Date(moment().add(1, 'day').tz("Asia/Kuwait").format('YYYY/MM/DD'));
  const maxDate = new Date(moment().add(7, 'day').tz("Asia/Kuwait").format('YYYY/MM/DD'));

  const changeDate = (val) => {
    setChoosenDate(val);
    if (isToday(val) && (currentHour + 1 < orderDetail?.maxTime) && (currentHour + 2 >= orderDetail?.minTime)) {
      changeTime(currentHour + 2)
      return
    }
    changeTime(orderDetail?.timeRange[0])
  }

  const changeTime = (val) => {
    setChoosenTime(convertAmPm(val))
  }

  const handleSubmit = () => {
    updateOrder({
      deiveryTime: {
        date: moment(choosenDate).format('YYYY/MM/DD'),
        time: choosenTime
      }
    });
    closeHandleClick();
  }

  const convertAmPm = (hour) => {
    return hour <= 11 ? hour + 'am' :
      hour === 12 ? hour + 'pm' : (hour - 12) + 'pm'
  }

  const convertHour = (hour) => {
    return hour <= 11 ? hour + ':00 AM' :
      hour === 12 ? hour + ':00 PM' : (hour - 12) + ':00 PM'
  }

  const isToday = (date) => {
    const today = new Date(moment().tz("Asia/Kuwait").format('YYYY/MM/DD'));

    if (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    ) {
      return true;
    }
    return false;
  }

  const OneHourDelivery = () => {
    setOneHour(true)
    changeDate(new Date(moment().tz("Asia/Kuwait").format('YYYY/MM/DD')))
    changeTime(currentHour + 1)
  }

  const ScheduleOrderDelivery = () => {
    setOneHour(false)
    changeDate(minDate)
    changeTime((orderDetail?.isEnabledASAP && currentHour + 1 < orderDetail?.maxTime) ? currentHour + 2 : orderDetail?.minTime + 1)
  }

  return (
    <ModalContainer>
      <ModalDialog>
        <FixedHeader>
          {currentLng === 'en'
            ? <FiArrowLeft size="20" onClick={closeHandleClick} />
            : <FiArrowRight size="20" onClick={closeHandleClick} />
          }
          <GobackTitle>{t('Delivery Time')}</GobackTitle>
        </FixedHeader>
        <ModalBody>
          <MainContainer>
            <DateTimeContainer>
              <ScheduleOption>
                <ScheduleOrder>
                  <Radio onClick={() => orderDetail?.isEnabledASAP && OneHourDelivery()} disabled={!orderDetail?.isEnabledASAP}>
                    {oneHour ? <FiCheckCircle color={theme.colors.primaryButtCol} size='22' /> : <FiCircle color={theme.colors.gray} size='22' />}
                    <span>1 {t('Hour')}</span>
                  </Radio>
                </ScheduleOrder>
                <ScheduleOrder>
                  <Radio onClick={() => ScheduleOrderDelivery()}>
                    {!oneHour ? <FiCheckCircle color={theme.colors.primaryButtCol} size='22' /> : <FiCircle color={theme.colors.gray} size='22' />}
                    <span>{t('Schedule Order')}</span>
                  </Radio>
                </ScheduleOrder>
              </ScheduleOption>
              {!oneHour && (
                <>
                  <CalendarContainer>
                    <Calendar
                      minDate={minDate}
                      maxDate={maxDate}
                      onChange={changeDate}
                      defaultValue={choosenDate}
                      showNavigation={false}
                    />
                  </CalendarContainer>
                  <FieldRow dir='ltr'>
                    <RadioGroup>
                      {orderDetail && orderDetail?.timeRange.map(time => (
                        (((currentHour + 1) < time && isToday(choosenDate)) || !isToday(choosenDate)) && <Radio onClick={() => changeTime(time)} key={`radio-${time}`} direction='ltr'>
                          {choosenTime === convertAmPm(time) ? <FiCheckCircle color={theme.colors.primaryButtCol} size='22' /> : <FiCircle color={theme.colors.gray} size='22' />}
                          <span>{convertHour(time)} - {convertHour(time + 1)}</span>
                        </Radio>
                      ))}
                    </RadioGroup>
                  </FieldRow>
                </>
              )}
            </DateTimeContainer>
          </MainContainer>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" width="100%" uppercase={true} onClick={handleSubmit}>
            {t('Confirm')}
          </Button>
        </ModalFooter>
      </ModalDialog>
    </ModalContainer>
  )
}