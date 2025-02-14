import { supabase } from "../../../lib/supabase"; // Asegúrate de que este archivo esté configurado correctamente

export async function crearInvestigacion(formData: FormData): Promise<void> {
  try {
    // Obtener la sesión desde Supabase
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error al obtener la sesión:", sessionError);
      throw new Error("No se pudo obtener la sesión del usuario.");
    }

    if (!session) {
      throw new Error("No se pudo obtener la sesión del usuario.");
    }

    // Log de la sesión para asegurarse de que estamos obteniendo el usuario autenticado
    console.log("Sesión obtenida del servidor:", session);

    // Obtener el valor del campo 'autor' desde el formulario
    const autor = formData.get("autor") as string;
    if (!autor) throw new Error("El campo 'autor' es obligatorio.");

    console.log("Nombre del autor:", autor);

    // Obtener el ID del autor desde la sesión
    const idAutor = session.user.id; // Usar el ID del usuario autenticado
    console.log("ID del autor (usuario autenticado):", idAutor);

    // Procesar los archivos
    const file = formData.get("archivo") as File;
    const imageFile = formData.get("imagenUrl") as File;

    if (!file || !imageFile)
      throw new Error("Archivo o imagen no proporcionados.");

    console.log(
      "Archivo recibido:",
      file.name,
      "Imagen recibida:",
      imageFile.name
    );

    // Sanitizar los nombres de los archivos
    const sanitizedFileName = file.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");
    const sanitizedImageName = imageFile.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");

    // Subir los archivos a Supabase Storage
    const filePath = `archivos/${Date.now()}_${sanitizedFileName}`;
    const { data: fileData, error: fileError } = await supabase.storage
      .from("inv")
      .upload(filePath, file);

    if (fileError)
      throw new Error(`Error al subir el archivo: ${fileError.message}`);

    const imagePath = `imagenes/${Date.now()}_${sanitizedImageName}`;
    const { data: imageData, error: imageError } = await supabase.storage
      .from("inv")
      .upload(imagePath, imageFile);

    if (imageError)
      throw new Error(`Error al subir la imagen: ${imageError.message}`);

    // Insertar los datos en la tabla 'investigaciones'
    const { error: dbError } = await supabase.from("investigaciones").insert([
      {
        nombre: formData.get("nombre"),
        autor: autor, // Guardar el nombre del autor desde el formulario
        fecha_publicacion: formData.get("fechaPublicacion"),
        descripcion: formData.get("descripcion"),
        archivo: fileData.path,
        imagen_url: imageData.path,
        id_autor: idAutor, // Usar el ID del usuario autenticado
        categoria: formData.get("categoria"),
      },
    ]);

    if (dbError)
      throw new Error(`Error al guardar la investigación: ${dbError.message}`);

    console.log("Investigación creada exitosamente.");
  } catch (error) {
    console.error("Error creando investigación:", error);
    throw error;
  }
}
