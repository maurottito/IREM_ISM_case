export function UploadPage() {
  return (
    <article className="panel hero-panel">
      <div className="hero-heading">
        <h3>Cargar registros de diagnóstico</h3>
        <p>Sube las fotos del formato PDR y revisa la extracción antes de validar.</p>
      </div>

      <div className="status-banner info-banner">
        <strong>Digitaliza el Registro de pruebas diagnósticas</strong>
        <span>El sistema lee las fotos, llena la tabla y te deja corregir cualquier campo.</span>
      </div>

      <div className="upload-box">
        <strong>Arrastra aquí las fotos de los registros</strong>
        <span>JPG · PNG · PDF · hasta 50 imágenes por lote</span>
        <div className="upload-actions">
          <button className="primary-button" type="button">Explorar imágenes</button>
          <button className="secondary-button" type="button">Tomar foto</button>
        </div>
      </div>

      <div className="process-card">
        <strong>Leyendo las fotos…</strong>
        <p>Lectura asistida de 8 fotos del formato con llenado automático de fecha, localidad, resultados y búsqueda.</p>
      </div>
    </article>
  );
}