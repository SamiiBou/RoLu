//
//  CustomView20.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView20: View {
    @State public var text24Text: String = "All"
    @State public var text25Text: String = "Moving"
    @State public var text26Text: String = "Childcare"
    @State public var text27Text: String = "Security"
    @State public var text28Text: String = "Plumber\n"
    @State public var text29Text: String = "Pets"
    @State public var text30Text: String = "Tutor"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Text(text24Text)
                .foregroundColor(Color(red: 0.13, green: 0.46, blue: 1.00, opacity: 1.00))
                .font(.custom("SFUIText-Semibold", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
            Text(text25Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 26, y: 0.059)
            Text(text26Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 170, y: 0.059)
            Text(text27Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 246, y: 0.059)
            Text(text28Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 14))
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 310, y: 0.059)
            Text(text29Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 85, y: 0.059)
            Text(text30Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 125, y: 0.059)
        }
        .frame(width: 354.081, height: 29.78, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView20_Previews: PreviewProvider {
    static var previews: some View {
        CustomView20()
    }
}
