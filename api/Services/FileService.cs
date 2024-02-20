namespace api.Services;

public class FileService
{
    public void WriteAllBytes(string path, byte[] bytes)
    {
        var directory = Path.GetDirectoryName(path);
        if (!Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        File.WriteAllBytes(path, bytes);
    }

    public byte[] ReadAllBytes(string path)
    {
        return File.ReadAllBytes(path);
    }

    public void Delete(string path)
    {
        File.Delete(path);
    }

    public string GetFileExtension(string filename)
    {
        return Path.GetExtension(filename);
    }
}