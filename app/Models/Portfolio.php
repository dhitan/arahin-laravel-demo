public function getCategoryNameAttribute()
{
    return match($this->category) {
        'sertifikat' => 'Certificate',
        'proyek_kuliah' => 'College Project',
        'portofolio_bebas' => 'Free Portfolio',
        'your_new_category' => 'Your Category Name', // Add here
        default => $this->category,
    };
}