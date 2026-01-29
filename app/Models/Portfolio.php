<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    const UPDATED_AT = null; // Only use created_at

    protected $fillable = [
        'student_id',
        'title',
        'description',
        'file_path',
        'category',
        'status',
        'admin_feedback',
        'verified_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    /**
     * Get the student that owns the portfolio.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get category display name.
     */
    public function getCategoryNameAttribute()
    {
        return match($this->category) {
            'sertifikat' => 'Certificate',
            'proyek_kuliah' => 'College Project',
            'portofolio_bebas' => 'Free Portfolio',
            default => $this->category,
        };
    }

    /**
     * Get status badge color.
     */
    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'approved' => 'green',
            'pending' => 'yellow',
            'rejected' => 'red',
            default => 'gray',
        };
    }

    /**
     * Scope: Only certificates.
     */
    public function scopeCertificates($query)
    {
        return $query->where('category', 'sertifikat');
    }

    /**
     * Scope: Only approved.
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope: Only pending.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}