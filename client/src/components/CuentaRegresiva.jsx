import React, { useState, useEffect } from 'react';

const CuentaRegresiva = ({ fechaLimite }) => {
    const [tiempoRestante, setTiempoRestante] = useState({
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0
    });

    useEffect(() => {
        const calcularTiempoRestante = () => {
            const ahora = new Date().getTime();
            const fechaObjetivo = new Date(fechaLimite).getTime();
            const diferencia = fechaObjetivo - ahora;

            if (diferencia > 0) {
                const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
                const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

                setTiempoRestante({ dias, horas, minutos, segundos });
            } else {
                setTiempoRestante({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
            }
        };

        calcularTiempoRestante();
        const intervalo = setInterval(calcularTiempoRestante, 1000);

        return () => clearInterval(intervalo);
    }, [fechaLimite]);

    return (
        <div className="cuenta-regresiva">
            <h2 className="cuenta-regresiva-titulo">¡Tiempo hasta las 2 PM!</h2>
            <div className="contador-grid">
                <div className="contador-item">
                    <div className="contador-numero">{tiempoRestante.dias}</div>
                    <div className="contador-label">Días</div>
                </div>
                <div className="contador-item">
                    <div className="contador-numero">{tiempoRestante.horas}</div>
                    <div className="contador-label">Horas</div>
                </div>
                <div className="contador-item">
                    <div className="contador-numero">{tiempoRestante.minutos}</div>
                    <div className="contador-label">Minutos</div>
                </div>
                <div className="contador-item">
                    <div className="contador-numero">{tiempoRestante.segundos}</div>
                    <div className="contador-label">Segundos</div>
                </div>
            </div>
            <p className="tiempo-mensaje">Hora de México (UTC-6)</p>
        </div>
    );
};

export default CuentaRegresiva;