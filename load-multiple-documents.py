def load_single_document_data(file_path: str):
    try:
        if file_path.endswith('.txt'):
            loader = TextLoader(file_path, encoding="utf8")
        elif file_path.endswith('.pdf'):
            loader = PDFMinerLoader(file_path)
        elif file_path.endswith('.csv'):
            loader = CSVLoader(file_path)
        else:
            print('file type not supported')
            return None
        return loader.load()[0]
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")
        return 


def load_document_data(source_dir: str) -> List:
    all_files = os.listdir(source_dir)
    documents = [load_single_document_data(f"{source_dir}/{file_path}") for file_path in tqdm(all_files) if file_path[-4:] in ['.txt', '.pdf', '.csv']]
    return [doc for doc in documents if doc is not None]
