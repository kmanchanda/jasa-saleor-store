import React from 'react';

import './scss/index.scss';

const ContactUs = () => {

    const formData = [
        [{
            label: 'Fornavn*',
            important: true,
            value: '',
            className: 'input'

        }, {
            label: 'Efternavn*',
            important: true,
            value: '',
            className: 'input'
        }],
        [{
            label: 'Din e-mail addresse*',
            important: true,
            value: '',
            className: 'input'

        }],
        [{
            label: 'Emne',
            important: false,
            value: '',
            className: 'input'

        },],
        [{
            label: 'Besked',
            important: true,
            value: '',
            className: 'textarea'

        },]
    ]


    return (
        <div className='main-conatct-us'>
            <div className='left-container'>
                <span className='heading-contact'>Kontakt os</span>
                <span className='heading-desc' > Har du spørgsmål til vores produkter, hvordan du handler med os eller noget helt tredje, så er du altid velkommen til at skrive til os.</span>
                <span className='heading-desc' >Du er også velkommen til at <span style={{ color: '#F5A930' }}>kontakte vores medarbejdere direkte her</span></span>

                <div className='separator-line'></div>

                <div className='complain-query-container'>

                    <span className='complain-desc' >Har du spørgsmål om produkter, bestillinger eller reklamationer?</span>
                    <div className='email-call-container'>
                        <div className='query-card skip-right-mn'>

                        </div>
                        <div className='query-card'>

                        </div>

                    </div>

                    <span className='query-timing' >Mandag-torsdag: 08:00-16:30</span>
                    <span className='query-timing'>Fredag: 08:00-14:00</span>

                    <div className='separator-line'></div>

                    <div className='row-flex footer-desc'>
                        {
                            dummyFooterData.map((item, index) => {
                                const { heading, subHeading } = item;
                                return (
                                    <div className='heading-item'>
                                        <span className='heading-footer-item'>
                                            {heading}
                                        </span>
                                        {
                                            subHeading.map((item, indexChild) => {
                                                return (<span className='subheading-footer-item'>
                                                    {item}
                                                </span>)
                                            })
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
            <div className='right-container'>
                {
                    formData.map((inputFields, pIndex) => {
                        return (
                            <div className='row-input'>
                                {
                                    inputFields.map((input, cIndex) => {
                                        const { className, label, value } = input;
                                        return (
                                            <div className='col-flex input-w-label'>
                                                <label className='label' >{label}</label>
                                                <input className={className} value={value} ></input>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }

                <button className='send-btn'>
                    Send besked
                </button>

            </div>
        </div>
    )

}
export default ContactUs;


const dummyFooterData = [
    {
        heading: 'Vores adresse',
        subHeading: ['Marøgelhøj 17',
            ' DK-8520 Lystrup',
            'Tlf. +45 46 94 90 08'],
    }, {
        heading: 'Åbningstider',
        subHeading: ['Mandag – Torsdag: Kl. 8:00 – 16:30',
            'Fredag: Kl. 8:00 – 14:00',
            'Lørdag – Søndag: Lukket'],
    },]