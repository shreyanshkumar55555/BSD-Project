import { jsPDF } from 'jspdf'

export function buildBsdProjectBriefPdf() {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 48
  let y = 64
  const generatedAt = new Date()

  const title = 'BSD Express City — Project Brief'
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text(title, margin, y)
  y += 18

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.text(
    `Generated from the website • ${generatedAt.toLocaleDateString()}`,
    margin,
    y,
  )
  doc.setTextColor(0)
  y += 24

  doc.setDrawColor(201, 168, 76)
  doc.setLineWidth(2)
  doc.line(margin, y, pageWidth - margin, y)
  y += 24

  const sections = [
    {
      heading: 'Overview',
      body:
        'BSD Express City is a plotted development positioned along the Lucknow–Kanpur growth corridor. The project focuses on strong connectivity, planned infrastructure, and long-term appreciation potential.',
    },
    {
      heading: 'Location & Connectivity',
      body:
        'Strategic access via Lucknow–Kanpur NH and the new expressway junction. Key nearby points include airport/metro connectivity and major transport hubs (indicative travel times vary by route).',
    },
    {
      heading: 'Amenities & Infrastructure (Highlights)',
      body:
        'Main entry gate, wide internal roads, commercial complex, 24×7 security, school, hospital, green areas/parks, and a dedicated cycle track.',
    },
    {
      heading: 'Plot Options',
      body:
        'Typical configurations: 1,200 sq.ft (compact), 1,800 sq.ft (standard), 3,000 sq.ft (premium), and above 3,000 sq.ft (commercial/villa). Pricing: on enquiry.',
    },
    {
      heading: 'Why Invest',
      body:
        'Pre-development entry advantage, limited inventory, and a tangible asset with legal ownership. Returns can improve as infrastructure and demand mature over time.',
    },
    {
      heading: 'Contact',
      body:
        'Office: 104, First Floor, JB Metro Height, Near RTO Office & Transport Nagar Metro, Lucknow\nEmail: info@bsdprojects.in | contact@bsdprojects.in',
    },
  ]

  const headingSize = 12
  const bodySize = 10
  const lineHeight = 14

  for (const s of sections) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(headingSize)
    doc.text(s.heading, margin, y)
    y += 16

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(bodySize)
    const lines = doc.splitTextToSize(s.body, pageWidth - margin * 2)
    doc.text(lines, margin, y)
    y += lines.length * lineHeight + 14

    if (y > 760) {
      doc.addPage()
      y = 64
    }
  }

  return doc
}

