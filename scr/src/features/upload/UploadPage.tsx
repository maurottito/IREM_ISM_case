export function UploadPage() {
  return (
    <article className="panel hero-panel">
      <h3>Cargar registros desde fotos</h3>
      <p>
        El supervisor sube imágenes de los formularios PDR y el sistema sugiere campos para revisión.
      </p>
      <div className="upload-box">
        <strong>Arrastra aquí las fotos de los formularios</strong>
        <span>JPG · PNG · PDF</span>
        <button className="secondary-button" type="button">Explorar imágenes</button>
      </div>
    </article>
  );
}