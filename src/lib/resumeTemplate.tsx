import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';

// Harvard Resume Format - clean, professional, tight spacing
const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 48,
    fontFamily: 'Times-Roman',
    fontSize: 10.5,
    lineHeight: 1.2,
    color: '#000',
  },
  // Header
  header: {
    textAlign: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Times-Bold',
    letterSpacing: 1,
    marginBottom: 10,
  },
  contactLine: {
    fontSize: 10,
    marginBottom: 1,
  },
  link: {
    color: '#000',
    textDecoration: 'underline',
  },
  // Divider line
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 8,
    marginBottom: 6,
  },
  // Section
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    marginTop: 8,
  },
  sectionDivider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    marginBottom: 6,
  },
  // Entry rows
  entryContainer: {
    marginBottom: 6,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryLeft: {
    flex: 1,
  },
  entryRight: {
    textAlign: 'right',
    minWidth: 100,
  },
  entryTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10.5,
  },
  entrySubtitle: {
    fontFamily: 'Times-Italic',
    fontSize: 10.5,
  },
  entryDetail: {
    fontSize: 10,
  },
  // Bullets
  bulletList: {
    marginTop: 2,
    marginLeft: 0,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 1,
    paddingLeft: 8,
  },
  bullet: {
    width: 8,
    fontSize: 10.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 1.25,
  },
  // Skills
  skillsContainer: {
    marginTop: 2,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  skillLabel: {
    fontFamily: 'Times-Bold',
    fontSize: 10.5,
  },
  skillText: {
    fontSize: 10.5,
  },
});

export interface ResumeData {
  name: string;
  email: string;
  workEmail: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  googleScholarUrl: string;
  summary: string;
  education: Array<{
    institution: string;
    degree: string;
    field?: string;
    period: string;
    location: string;
    gpa?: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    period: string;
    location: string;
    bullets: string[];
    tools?: string;
  }>;
  projects: Array<{
    title: string;
    period: string;
    bullets: string[];
    publication?: string;
    publicationLink?: string;
  }>;
  skills: {
    programming: string[];
    ml: string[];
    hpc: string[];
    simulation: string[];
  };
  leadership?: string[];
}

function ResumeDocument({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name.toUpperCase()}</Text>
          <Text style={styles.contactLine}>
            {data.location} | {data.email} | <Link src={data.linkedinUrl} style={styles.link}>LinkedIn</Link> | <Link src={data.githubUrl} style={styles.link}>GitHub</Link> | <Link src={data.googleScholarUrl} style={styles.link}>Scholar</Link>
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Education */}
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.sectionDivider} />
        {data.education.map((edu, idx) => (
          <View key={idx} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryLeft}>
                <Text style={styles.entryTitle}>{edu.institution}</Text>
                <Text style={styles.entrySubtitle}>
                  {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                  {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                </Text>
              </View>
              <View style={styles.entryRight}>
                <Text style={styles.entryDetail}>{edu.location}</Text>
                <Text style={styles.entryDetail}>{edu.period}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Experience */}
        <Text style={styles.sectionTitle}>Experience</Text>
        <View style={styles.sectionDivider} />
        {data.experience.map((exp, idx) => (
          <View key={idx} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryLeft}>
                <Text style={styles.entryTitle}>{exp.company}</Text>
                <Text style={styles.entrySubtitle}>{exp.role}</Text>
              </View>
              <View style={styles.entryRight}>
                <Text style={styles.entryDetail}>{exp.location}</Text>
                <Text style={styles.entryDetail}>{exp.period}</Text>
              </View>
            </View>
            <View style={styles.bulletList}>
              {exp.bullets.map((bullet, bIdx) => (
                <View key={bIdx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionTitle}>Research & Projects</Text>
        <View style={styles.sectionDivider} />
        {data.projects.map((proj, idx) => (
          <View key={idx} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryLeft}>
                <Text style={styles.entryTitle}>{proj.title}</Text>
              </View>
              <View style={styles.entryRight}>
                <Text style={styles.entryDetail}>{proj.period}</Text>
              </View>
            </View>
            <View style={styles.bulletList}>
              {proj.bullets.map((bullet, bIdx) => (
                <View key={bIdx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
              {proj.publication && proj.publicationLink && (
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Publication: <Link src={proj.publicationLink} style={styles.link}>{proj.publication}</Link>
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.skillsContainer}>
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>Programming: </Text>
            <Text style={styles.skillText}>{data.skills.programming.join(', ')}</Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>Machine Learning: </Text>
            <Text style={styles.skillText}>{data.skills.ml.join(', ')}</Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>HPC & Cloud: </Text>
            <Text style={styles.skillText}>{data.skills.hpc.join(', ')}</Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>Simulation & CAE: </Text>
            <Text style={styles.skillText}>{data.skills.simulation.join(', ')}</Text>
          </View>
        </View>

        {/* Leadership */}
        {data.leadership && data.leadership.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Leadership & Teaching</Text>
            <View style={styles.sectionDivider} />
            <View style={styles.bulletList}>
              {data.leadership.map((item, idx) => (
                <View key={idx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
}

// Export a function that generates the PDF buffer
export async function generateResumePDF(data: ResumeData): Promise<Buffer> {
  const { renderToBuffer } = await import('@react-pdf/renderer');
  return renderToBuffer(<ResumeDocument data={data} />);
}
