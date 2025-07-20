import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function PaymentPage() {
    const router = useRouter()
    const { id } = router.query

    const { amount } = router.query
    const paypalRef = useRef(null)
    const [paid, setPaid] = useState(false)
    const [error, setError] = useState('')
    const [publishEnabled, setPublishEnabled] = useState(false)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`
        script.addEventListener('load', () => {
            window.paypal.Buttons({
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: { value: amount }
                        }]
                    })
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        setPaid(true)
                        setPublishEnabled(true)
                    })
                },
                onError: function (err) {
                    console.error(err)
                    setError('Payment failed. Please try again.')
                    setPublishEnabled(false)
                }
            }).render(paypalRef.current)
        })
        document.body.appendChild(script)
    }, [amount])

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Payment</h2>
            <p>Motivate contributions by rewarding the winner</p>
            <h3>{amount}$</h3>

            {!paid ? (
                <>
                    <div ref={paypalRef}></div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            ) : (
                <p style={{ color: 'green' }}>✅ Payment successful!</p>
            )}

            <button
                style={{
                    marginTop: '1rem',
                    background: 'black',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '6px',
                    opacity: publishEnabled ? 1 : 0.5,
                    cursor: publishEnabled ? 'pointer' : 'not-allowed'
                }}
                disabled={!publishEnabled}
                onClick={() => router.push('/success')}
            >
                Publish
            </button>
        </div>
    )
}
