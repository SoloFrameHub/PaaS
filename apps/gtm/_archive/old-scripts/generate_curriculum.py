import re
import sys
import os

input_file = "lib/data/curriculum.ts"
output_file = "docs/generated_curriculum.md"

if not os.path.exists(input_file):
    print(f"Error: {input_file} not found")
    sys.exit(1)

print(f"Processing {input_file}")

with open(input_file, 'r') as f:
    lines = f.readlines()

out = []
out.append("# SoloFrameHub Curriculum Reference")
out.append("\n> Auto-generated from `lib/data/curriculum.ts`\n")

in_lessons = False
in_outcomes = False

# Regex for key-value properties:  key: 'value' (handling escaped quotes)
prop_re = re.compile(r"^\s*(\w+):\s*'((?:[^'\\]|\\.)*)',?")

for line in lines:
    clean = line.strip()

    # Handle single-line course objects (e.g. tracks 5 & 6)
    if clean.startswith("{") and "title: 'Course" in clean:
        # Extract fields via search
        m_title = re.search(r"title:\s*'((?:[^'\\]|\\.)*)'", clean)
        m_desc = re.search(r"description:\s*'((?:[^'\\]|\\.)*)'", clean)
        m_dur = re.search(r"duration:\s*'((?:[^'\\]|\\.)*)'", clean)
        
        if m_title:
            val = m_title.group(1).replace(r"\'", "'")
            out.append(f"\n### {val}\n")
            
        if m_desc:
            val = m_desc.group(1).replace(r"\'", "'")
            out.append(f"{val}\n")
            
        if m_dur:
            val = m_dur.group(1).replace(r"\'", "'")
            out.append(f"*Duration: {val}*\n")
            
        # Parse outcomes if present single-line
        if "outcomes: [" in clean:
            start = clean.find("outcomes: [") + 11
            end = clean.find("]", start)
            content = clean[start:end]
            items = re.findall(r"'((?:[^'\\]|\\.)*)'", content)
            if items:
                out.append("\n**Outcomes:**\n")
                for item in items:
                    val = item.replace(r"\'", "'")
                    out.append(f"- {val}")
        continue
    
    # Handle block parsing
    if "lessons: [" in clean:
        # Skip empty lessons list
        if "lessons:[]" in clean.replace(" ", ""):
             continue
             
        out.append("\n**Lessons:**\n")
        # Check if single line empty (redundant check but safe)
        if "]" in clean:
            pass 
        else:
            in_lessons = True
        continue
        
    if in_lessons and "]" in clean:
        in_lessons = False
        continue
        
    if "outcomes: [" in clean:
        if "]" in clean:
            # Single line outcomes
            content = clean[clean.find("[")+1:clean.rfind("]")]
            items = re.findall(r"'((?:[^'\\]|\\.)*)'", content)
            if items:
                out.append("\n**Outcomes:**\n")
                for item in items:
                    val = item.replace(r"\'", "'")
                    out.append(f"- {val}")
        else:
            in_outcomes = True
            out.append("\n**Outcomes:**\n")
        continue

    if in_outcomes and "]" in clean:
        in_outcomes = False
        continue
        
    # Property parsing
    m = prop_re.match(clean)
    if m:
        key = m.group(1)
        val = m.group(2).replace(r"\'", "'")
        
        if key == "title":
            # Track detection
            if re.match(r"^\d+\.", val):
                out.append(f"\n## {val}\n")
            else:
                out.append(f"\n### {val}\n")
        
        elif key == "description":
            out.append(f"{val}\n")
            
        elif key == "duration":
            out.append(f"*Duration: {val}*\n")
            
        continue

    # Outcome items
    if in_outcomes and clean.startswith("'"):
        m_str = re.match(r"'((?:[^'\\]|\\.)*)'", clean)
        if m_str:
            val = m_str.group(1).replace(r"\'", "'")
            out.append(f"- {val}")

    # Lesson items
    if in_lessons and clean.startswith("{"):
        # Extract title and duration
        m_title = re.search(r"title:\s*'((?:[^'\\]|\\.)*)'", clean)
        m_dur = re.search(r"duration:\s*'([^']*)'", clean)
        
        if m_title:
            title = m_title.group(1).replace(r"\'", "'")
            dur = m_dur.group(1) if m_dur else ""
            dur_str = f" ({dur})" if dur else ""
            out.append(f"- {title}{dur_str}")

with open(output_file, 'w') as f:
    f.write("\n".join(out))

print(f"Successfully generated {output_file}")
