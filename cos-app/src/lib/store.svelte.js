// src/lib/store.svelte.js

export const certStore = $state({
    certificates: [
        {
            id: '1',
            title: 'Certificate 1',
            data: {
                month: '', name: '', position: '', college: '', 
                attestedBy: '', approvedBy: '', signature: '',
                activities: [
                    { desc: '', hours: '' }, { desc: '', hours: '' },
                    { desc: '', hours: '' }, { desc: '', hours: '' }
                ]
            }
        }
    ],

    addCertificate() {
        const newId = Date.now().toString(); 
        const newNumber = this.certificates.length > 0 
            ? Math.max(...this.certificates.map(c => parseInt(c.title.replace('Certificate ', '')) || 0)) + 1 
            : 1;
        
        this.certificates.push({
            id: newId,
            title: `Certificate ${newNumber}`,
            data: {
                month: '', name: '', position: '', college: '', 
                attestedBy: '', approvedBy: '', signature: '',
                activities: [
                    { desc: '', hours: '' }, { desc: '', hours: '' },
                    { desc: '', hours: '' }, { desc: '', hours: '' }
                ]
            }
        });
    },

    // delete function
    deleteCertificate(id) {
        // Filter out the certificate with the matching ID
        this.certificates = this.certificates.filter(cert => cert.id !== id);
        
        // always have one cert, if delete all, add again automatically
        if (this.certificates.length === 0) {
            this.addCertificate();
        }
    }
});