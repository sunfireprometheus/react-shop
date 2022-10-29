import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { useOrder } from '../../contexts/OrderContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FixedHeader, GobackTitle } from '../Layout/FixedHeader';
import { MainContent } from '../Layout/MainContent';
import { FixedFooter } from '../Layout/FixedFooter';
import { Button } from '../Shared/Buttons'
import { CheckoutProgress } from '../CheckoutProgress';
import ApiService from '../../service/ApiService';
// import kentService from '../../service/kentService';
import { useCart } from '../../contexts/CartContext';
import { useConfig } from '../../contexts/ConfigContext';
import { useAddress } from '../../contexts/AddressContext';
import { PaymentHeader } from './PaymentHeader'
import { PaymentType } from './PaymentType'
import { CreditForm } from './CreditForm'
import { Loading } from '../Shared/Loading'
import {
  PaymentContainer
} from './styles';

export const Payment = () => {
  const currentLng = localStorage.getItem('i18nextLng');
  const [orderDetail, { updateOrder }] = useOrder();
  const [configState] = useConfig()
  const [theme] = useTheme()
  const [, cities] = useAddress();
  const [cart] = useCart();
  const history = useHistory();
  const { t } = useTranslation();
  const [payment, setPayment] = useState(orderDetail.payment);
  const [loading, setLoading] = useState(false)

  const subTotal = cart?.length === 0 ? 0 :
    cart?.length === 1 ? cart[0]?.price * cart[0]?.count : cart.reduce((prev, next) => (prev?.count * prev?.price || prev) + next?.count * next?.price)
  const currentCity = cities.find(obj => obj.id === orderDetail?.currentLocation);
  const deliveryFee = currentCity?.charge ? currentCity?.charge : 0;
  const _coupon = orderDetail?.coupon ?
    (orderDetail?.coupon?.couponType === 'percent' ? orderDetail?.coupon?.couponAmount * subTotal / 100 : orderDetail?.coupon?.couponAmount) : 0
  const TotalAmount = subTotal + deliveryFee - _coupon

  const handlePayment = (val) => {
    setPayment(val);
  }

  const creatOrder = async (paymentType) => {
    const orderReferenceNumber = new Date().getTime()
    const unitType = orderDetail?.unitType === 'house' ? 1 :
      orderDetail?.unitType === 'apartment' ? 2 : 3
    const unitNumber = orderDetail?.unitType === 'house' ? orderDetail?.address?.house_no :
      orderDetail?.unitType === 'apartment' ? orderDetail?.address?.apartment_no : orderDetail?.address?.office_no

    const orderUrl = '/new_order'
    const orderObj = {
      orderReferenceNumber: orderReferenceNumber,
      name: orderDetail?.contact?.name,
      phone: orderDetail?.contact?.phone,
      total: TotalAmount,
      payment_type: paymentType,
      delivery_charge: deliveryFee,
      delivery_date: orderDetail?.deiveryTime?.date,
      delivery_time: orderDetail?.deiveryTime?.time,
      unit_type: unitType,
      unit_number: Number(unitNumber),
      state: orderDetail?.currentState || 1,
      avenue: Number(orderDetail?.address?.avenue || ''),
      city: orderDetail?.currentLocation || 1,
      block: Number(orderDetail?.address?.block),
      street: orderDetail?.address?.street || '',
      building: Number(orderDetail?.address?.building) || null,
      floor: Number(orderDetail?.address?.floor) || null,
      additional: orderDetail?.address?.additional || '',
      product_id: cart.map(ca => ca.prodId),
      price: cart.map(ca => ca.price * ca.count),
      qty: cart.map(ca => ca.count)
    }

    try {
      setLoading(true)
      const result = await ApiService(orderUrl, orderObj, 'post');
      if (result?.success === "1" && result?.order_id) {
        try {
          createPayment(paymentType, result?.order_id, orderReferenceNumber)
        } catch (error) {
          setLoading(false)
          console.log(error, 'payResult error')
        }
        return
      }
      console.log('faild order')
      setLoading(false)
    } catch (err) {
      console.log(err, 'order error')
      setLoading(false)
    }
  }

  const createPayment = async (paymentType, orderId, orderReferenceNumber) => {
    const paymentUrl = '/payment'
    if (paymentType === 0) {
      const changes = {
        orderInfo: {
          paymentStatus: true,
          orderReferenceNumber: orderReferenceNumber,
          amount: TotalAmount,
          method: 0,
          variable1: orderId, // order id
          variable2: subTotal,
          variable3: deliveryFee,
          variable4: _coupon
        }
      }
      updateOrder(changes);
      setLoading(false)
      history.push('./confirm?data=cashpay')
      return
    }

    const resPayEndPoint = configState?.configs?.paymentApiUrl + '/payment?data=';
    const paymentObj = {
      orderReferenceNumber: orderReferenceNumber,
      amount: TotalAmount,
      paymentType: paymentType,
      currency: configState?.configs?.currency,
      responseUrl: configState?.configs?.response_url,
      failureUrl: configState?.configs?.failure_url,
      variable1: orderId, // order id
      variable2: subTotal,
      variable3: deliveryFee,
      variable4: _coupon,
      merchantCode: configState?.configs?.merchantCode,
      version: configState?.configs?.version
    }

    try {
      const result = await ApiService(paymentUrl, paymentObj, 'post');
      setLoading(false)
      window.location.href = resPayEndPoint + result?.token?.data;

    } catch (err) {
      console.log(err, 'error')
      setLoading(false)
    }
  }

  const goConfirm = () => {
    if (payment) {
      updateOrder({
        payment: payment
      });

      const paymentType = payment === 'cash' ? 0 :
        payment === 'knet' ? 1 : 2
      creatOrder(paymentType)
    }
  }

  const goBack = () => {
    history.goBack();
  }

  return (
    <>
      {loading && <Loading color={theme.colors.loadingCol} />}
      <PaymentContainer>
        <FixedHeader>
          {currentLng === 'en'
            ? <FiArrowLeft size="20" onClick={goBack} />
            : <FiArrowRight size="20" onClick={goBack} />
          }
          <GobackTitle>{t('Checkout')}</GobackTitle>
        </FixedHeader>
        <CheckoutProgress step={3} />
        <MainContent>
          <PaymentHeader />
          <PaymentType payment={payment} handlePayment={handlePayment} />
          {payment === 'credit' && <CreditForm />}
        </MainContent>
        <FixedFooter>
          <Button color="primary" width="100%" onClick={goConfirm} disabled={loading} >
            {t('Next')}
          </Button>
        </FixedFooter>
      </PaymentContainer>
    </>
  )
}
